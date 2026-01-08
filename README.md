# Resume Builder & ATS Scanner  
*Full-Stack Development Mini Project*

---

## 📌 Project Overview

This project is a **full-stack MERN web application** that allows users to:

- Build professional resumes using structured input and templates
- Upload resumes (`.pdf` / `.docx`) for **ATS (Applicant Tracking System)** analysis
- Receive an **ATS compatibility score**
- Get **AI-generated resume improvement suggestions**
- Download the complete analysis report as a PDF

The application demonstrates **frontend–backend integration**, **REST APIs**, **database usage**, and **AI integration**, making it suitable for a **Full Stack Development course project**.

---

## 🧱 Tech Stack

### Frontend
- React.js
- React Bootstrap
- Framer Motion
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (file uploads)
- PDF parsing & resume extraction

### AI Integration
- Local / server-side LLM (example: `llama3.1:8b`)
- AI used to generate resume improvement suggestions dynamically

---

## ✨ Key Features

### Resume Builder
- Structured input: education, skills, experience, projects
- Multiple resume templates
- ATS-friendly formatting
- Printable resumes

### ATS Scanner
- Upload resume (`.pdf` / `.docx`)
- Resume text extraction
- Rule-based ATS scoring

### AI Resume Suggestions
- Automatically generated (no hardcoding)
- Missing sections detection
- Summary and bullet-point improvements
- Keywords to add
- Included in downloadable PDF

---

## 📂 Project Structure

```
Resume-Builder-and-ATS-Scanner/
├── server/
├── client/
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites
- Node.js (v16+)
- npm
- MongoDB

### 2️⃣ Clone Repository
```bash
git clone https://github.com/<your-username>/Resume-Builder-and-ATS-Scanner.git
cd Resume-Builder-and-ATS-Scanner
```

### 3️⃣ Install Dependencies
```bash
npm install
cd client
npm install
cd ..
```

### 4️⃣ Environment Variables

Create `.env` in root:

```env
PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
ENCRYPTION_KEY=32_byte_key
AI_MODEL=llama3.1:8b
```

### 5️⃣ Run Application
```bash
npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:5001  

---

## 🎓 Course Relevance

- MERN stack implementation
- REST APIs
- File uploads
- AI integration
- Real-world ATS use case

---

## 📌 Notes
- `.env` must not be committed
- AI suggestions are dynamic
- Upload logic remains unchanged

---

## ✅ Ready to Run

Once dependencies and environment variables are set, the project runs on any lab system.

