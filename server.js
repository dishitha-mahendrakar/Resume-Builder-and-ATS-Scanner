require("dotenv").config();
const aiRoutes = require("./routes/aiRoutes");
const express = require("express");
const dbConnect = require("./dbConnect");
const userRoute = require("./routes/userRoutes");
const ResumeParser = require("./resume-parser-master/src");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const College = require("./models/colleges");
const resumeData = require("./models/resume");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const morgan = require("morgan");
// const { stream } = require("./logger");
const { morganStream } = require("./morganLogger");
const { encrypt, decrypt } = require("./utils/encryption"); // Import the encrypt function
const pdfParse = require("pdf-parse");
const { extractResumeJSONWithAI } = require("./utils/aiExtract");


const app = express();
// HTTP request logging
app.use(morgan("combined", { stream: morganStream }));

const port = process.env.PORT;

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"]; // Only allow frontend domains

// Secure HTTP Headers to Prevent Clickjacking, XSS, and Security Misconfigurations
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"], // Removed 'unsafe-inline' to prevent XSS
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    frameguard: { action: "deny" }, // Prevents Clickjacking (fixes Nikto warning)
    noSniff: true, // Prevents MIME-type sniffing (fixes Nikto warning)
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // HSTS Preloading (forces HTTPS)
    referrerPolicy: { policy: "strict-origin-when-cross-origin" }, // Controls referrer exposure
    hidePoweredBy: true, // Hides 'X-Powered-By' header (fixes Nikto warning)
    xssFilter: true, // Mitigates reflected XSS attacks
  })
);

// Strict CORS Policy
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy violation: Origin not allowed"));
      }
    },
    credentials: true, // Allow cookies only for trusted origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Restrict allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Restrict headers
    optionsSuccessStatus: 204, // Fixes preflight request issues
  })
);

app.disable("x-powered-by"); // Disables the 'X-Powered-By' header

app.use(mongoSanitize()); // all user inputs will be automatically sanitized before reaching MongoDB.

app.use(cookieParser()); // Enables reading cookies from requests

app.use(express.json());
// You can use app.use(express.urlencoded({ extended: true })) to parse URL-encoded request bodies.
app.use(express.urlencoded({ extended: true }));

app.use("/api/user/", userRoute);
app.use("/api/ai", aiRoutes);


app.use(function (req, res, next) {
  if (req.path === "/result" || req.path === "/colleges") {
    res.header("Content-Type", "application/json");
  }
  next();
});

app.set("view engine", "ejs");

//---------------MULTER UPLOAD SECTION-------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //null(no errors), "destination"
    cb(null, "./resume-parser-master/resumeFiles/");
  },
  filename: (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, Date.now() + ext);
  },

});


const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".pdf" || ext === ".docx") return cb(null, true);
    cb(new Error("Only .pdf and .docx files are allowed"));
  },
});


app.get("/debug-headers", (req, res) => {
  res.json({ headers: res.getHeaders() });
});

//single means single file, for multiple files we say upload.arrays
//upload.single("Input tag name to be passed in which you are uploading the file")
app.post("/upload", upload.single("File"), async (req, res) => {
  try {
    if (!req.file?.filename) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const uploadedPath = `./resume-parser-master/resumeFiles/${req.file.filename}`;
    const ext = path.extname(req.file.filename).toLowerCase();

    let resumeText = "";

    if (ext === ".pdf") {
      const buf = fs.readFileSync(uploadedPath);
      const parsed = await pdfParse(buf);
      resumeText = (parsed.text || "").trim();
    } else if (ext === ".docx") {
      await ResumeParser.parseResumeFile(
        uploadedPath,
        `./resume-parser-master/resumeFiles/compiled`
      );

      const resumeJson = fs.readFileSync(
        `./resume-parser-master/resumeFiles/compiled/${req.file.filename}.json`
      );

      const resume = JSON.parse(resumeJson);

      const parts = [];
      for (const k of Object.keys(resume)) {
        const v = resume[k];
        if (!v) continue;
        if (Array.isArray(v)) parts.push(`${k}: ${v.join(", ")}`);
        else parts.push(`${k}: ${v}`);
      }
      resumeText = parts.join("\n").trim();
    } else {
      return res.status(400).json({ success: false, message: "Unsupported file type" });
    }

    if (!resumeText || resumeText.length < 50) {
      return res.status(400).json({
        success: false,
        message: "Could not extract readable text from resume",
      });
    }

    console.log("AI DEBUG: extracted text length =", resumeText.length);
    const aiResume = await extractResumeJSONWithAI(resumeText);
    console.log("AI DEBUG: aiResume keys =", Object.keys(aiResume));
    console.log("AI DEBUG: aiResume preview =", {
      name: aiResume.name,
      email: aiResume.email,
      skills: (aiResume.skills || "").slice(0, 80),
    });
  
    const s = (v) => (typeof v === "string" ? v : v == null ? "" : String(v));

    const resumeFile = new resumeData({
      name: aiResume.name ? encrypt(s(aiResume.name)) : "",
      email: aiResume.email ? encrypt(s(aiResume.email)) : "",
      phone: aiResume.phone ? encrypt(s(aiResume.phone)) : "",
      skills: aiResume.skills ? encrypt(s(aiResume.skills)) : "",
      experience: aiResume.experience ? encrypt(s(aiResume.experience)) : "",
      education: aiResume.education ? encrypt(s(aiResume.education)) : "",
      projects: aiResume.projects ? encrypt(s(aiResume.projects)) : "",
      interests: aiResume.interests ? encrypt(s(aiResume.interests)) : "",
      certification: aiResume.certification ? encrypt(s(aiResume.certification)) : "",
      objective: aiResume.objective ? encrypt(s(aiResume.objective)) : "",
      summary: aiResume.summary ? encrypt(s(aiResume.summary)) : "",
      technology: aiResume.technology ? encrypt(s(aiResume.technology)) : "",
      languages: aiResume.languages ? encrypt(s(aiResume.languages)) : "",
      links: aiResume.links ? encrypt(s(aiResume.links)) : "",
      contacts: aiResume.contacts ? encrypt(s(aiResume.contacts)) : "",
      positions: aiResume.positions ? encrypt(s(aiResume.positions)) : "",
      profiles: aiResume.profiles ? encrypt(s(aiResume.profiles)) : "",
      awards: aiResume.awards ? encrypt(s(aiResume.awards)) : "",
      honors: aiResume.honors ? encrypt(s(aiResume.honors)) : "",
      additional: aiResume.additional ? encrypt(s(aiResume.additional)) : "",
      courses: aiResume.courses ? encrypt(s(aiResume.courses)) : "",
    });

    await resumeFile.save();

    return res.json({
      success: true,
      message: "File Uploaded + AI Parsed + Saved Successfully",
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Error parsing uploaded file",
    });
  }
});


// -----------------------RESULT API----------------------------------------------

//this endpoint will send the latest json file to the score.js file in react and use that file's data
app.get("/result", async (req, res) => {
  try {
    const latestResume = await resumeData.findOne().sort({ createdAt: -1 });

    if (!latestResume) {
      return res.status(404).json({ message: "No resume data found" });
    }

    const resume = latestResume.toObject();

    // Safe decryption
    resume.name = resume.name?.includes(":")
      ? decrypt(resume.name)
      : resume.name;
    resume.email = resume.email?.includes(":")
      ? decrypt(resume.email)
      : resume.email;
    resume.phone = resume.phone?.includes(":")
      ? decrypt(resume.phone)
      : resume.phone;
    resume.skills = resume.skills?.includes(":")
      ? decrypt(resume.skills)
      : resume.skills;
    resume.experience = resume.experience?.includes(":")
      ? decrypt(resume.experience)
      : resume.experience;
    resume.education = resume.education?.includes(":")
      ? decrypt(resume.education)
      : resume.education;
    resume.projects = resume.projects?.includes(":")
      ? decrypt(resume.projects)
      : resume.projects;
    resume.interests = resume.interests?.includes(":")
      ? decrypt(resume.interests)
      : resume.interests;
    resume.certification = resume.certification?.includes(":")
      ? decrypt(resume.certification)
      : resume.certification;
    resume.objective = resume.objective?.includes(":")
      ? decrypt(resume.objective)
      : resume.objective;
    resume.summary = resume.summary?.includes(":")
      ? decrypt(resume.summary)
      : resume.summary;
    resume.technology = resume.technology?.includes(":")
      ? decrypt(resume.technology)
      : resume.technology;
    resume.languages = resume.languages?.includes(":")
      ? decrypt(resume.languages)
      : resume.languages;
    resume.links = resume.links?.includes(":")
      ? decrypt(resume.links)
      : resume.links;
    resume.contacts = resume.contacts?.includes(":")
      ? decrypt(resume.contacts)
      : resume.contacts;
    resume.positions = resume.positions?.includes(":")
      ? decrypt(resume.positions)
      : resume.positions;
    resume.profiles = resume.profiles?.includes(":")
      ? decrypt(resume.profiles)
      : resume.profiles;
    resume.awards = resume.awards?.includes(":")
      ? decrypt(resume.awards)
      : resume.awards;
    resume.honors = resume.honors?.includes(":")
      ? decrypt(resume.honors)
      : resume.honors;
    resume.additional = resume.additional?.includes(":")
      ? decrypt(resume.additional)
      : resume.additional;
    resume.courses = resume.courses?.includes(":")
      ? decrypt(resume.courses)
      : resume.courses;

    // ---- Aliases for frontend ATS scoring compatibility ----
    resume.certifications = resume.certification;
    resume.certificates = resume.certification;
    resume.workexperience = resume.experience;
    resume.profile = resume.profiles;
    resume.achievements = resume.awards || resume.honors;
    resume.achievement = resume.awards || resume.honors;
    
    res.json(resume);
    console.log(resume);
  } catch (error) {
    console.error("Error fetching/decrypting resume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//------------COLLEGE DATA----------------------

app.get("/colleges", async (req, res) => {
  try {
    //ONLY FINDING COLLEGES BY NAME
    const colleges = await College.find({}, { _id: 0, name: 1 }).sort({
      name: 1,
    });
    res.json(colleges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
