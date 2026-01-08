// routes/aiRoutes.js
const express = require("express");
const router = express.Router();

const resumeData = require("../models/resume");
const { decrypt } = require("../utils/encryption");
const { suggestImprovementsFromResume } = require("../utils/aiSuggest");

router.get("/suggest-latest", async (req, res) => {
  try {
    const latestResume = await resumeData.findOne().sort({ createdAt: -1 });
    if (!latestResume) {
      return res.status(404).json({ success: false, message: "No resume found" });
    }

    // decrypt safely (same logic style as /result)
    const r = latestResume.toObject();
    const safeDec = (v) => (typeof v === "string" && v.includes(":") ? decrypt(v) : v);

    const plain = {
      name: safeDec(r.name) || "",
      email: safeDec(r.email) || "",
      phone: safeDec(r.phone) || "",
      objective: safeDec(r.objective) || "",
      summary: safeDec(r.summary) || "",
      skills: safeDec(r.skills) || "",
      experience: safeDec(r.experience) || "",
      education: safeDec(r.education) || "",
      projects: safeDec(r.projects) || "",
      certification: safeDec(r.certification) || "",
      courses: safeDec(r.courses) || "",
      links: safeDec(r.links) || "",
      profiles: safeDec(r.profiles) || "",
      awards: safeDec(r.awards) || "",
      honors: safeDec(r.honors) || "",
      interests: safeDec(r.interests) || "",
      languages: safeDec(r.languages) || "",
      additional: safeDec(r.additional) || "",
    };

    const suggestions = await suggestImprovementsFromResume(plain);

    return res.json({
      success: true,
      suggestions, // array or object (we'll build it like array of bullets)
    });
  } catch (err) {
    console.error("AI SUGGEST ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Failed to generate suggestions",
    });
  }
});

module.exports = router;
