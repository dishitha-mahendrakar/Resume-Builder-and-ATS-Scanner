
# PES University
### Department of Computer Science & Engineering

---

## Full Stack Development Course Mini Project

### Project Title
Resume Builder and ATS Scanner with AI-Based Suggestions

---

### Course Name
Full Stack Development

### Course Code
UE25CS621A

### Academic Year
2025 – 2026

---

### Submitted By
Dishitha Mahendrakar

### Guided By
Faculty Name  
Assistant Professor  
Department of Computer Science & Engineering  
PES University, Bengaluru

---

## Project Overview

This project is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to help users build professional resumes and evaluate them using an Applicant Tracking System (ATS). The system integrates artificial intelligence to provide meaningful, automated suggestions to improve resume quality.

The application supports resume creation, resume upload in PDF or DOCX format, ATS scoring, AI-based improvement suggestions, and downloadable reports.

---

## System Features

1. Resume Builder with multiple templates
2. Resume upload and text extraction
3. ATS compatibility scoring
4. AI-generated resume improvement suggestions
5. Downloadable ATS and AI analysis report (PDF)
6. Fully local execution without paid APIs

---

## Technology Stack

Frontend:
- React.js
- React Bootstrap
- Framer Motion

Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- Multer for file uploads
- PDF and DOCX parsing utilities

AI Integration:
- Ollama (local LLM runtime)
- Model: llama3.1:8b

---

## Project Folder Structure

```
Resume-Builder-and-ATS-Scanner/
├── client/
│   ├── src/
│   ├── package.json
│
├── server/
│   ├── routes/
│   ├── utils/
│   ├── models/
│   ├── package.json
│
├── .env
├── README.md
```

---

## Setup and Execution Instructions

### Prerequisites

Ensure the following software is installed on the system:

- Node.js (version 18 or higher)
- npm (bundled with Node.js)
- MongoDB (local installation or MongoDB Atlas)
- Git
- Ollama (for AI suggestions)

---

## Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install backend dependencies:

```bash
npm install
```

3. Create a `.env` file inside the server directory with the following contents:

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/resume_ats
AI_MODEL=llama3.1:8b
```

---

## AI Setup (Ollama)

1. Install Ollama from:
https://ollama.com

2. Pull the required model:

```bash
ollama pull llama3.1:8b
```

3. Start the Ollama service:

```bash
ollama serve
```

Ensure Ollama is running before starting the backend.

---

## Start Backend Server

From the server directory:

```bash
npm start
```

The backend will run on:
http://localhost:5001

---

## Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install frontend dependencies:

```bash
npm install
```

3. Start the frontend:

```bash
npm start
```

The frontend will run on:
http://localhost:3000

---

## Using the Application

1. Open the application in the browser at http://localhost:3000
2. Upload a resume file in PDF or DOCX format
3. Click "Get Your Results"
4. View ATS score and rule-based feedback
5. View AI-generated resume improvement suggestions
6. Download the complete report as a PDF

---

## Troubleshooting

- Ensure MongoDB service is running
- Ensure Ollama is running before accessing AI suggestions
- Verify AI endpoint:
  http://localhost:5001/api/ai/suggest-latest
- Restart backend if AI model changes

---

## Course Relevance

This project demonstrates:

- Full stack MERN development
- RESTful API design
- File upload handling
- AI model integration
- Frontend-backend synchronization
- Practical industry-relevant ATS use case

---

## Declaration

This project is developed as part of the Full Stack Development course at PES University and is intended solely for academic purposes.
