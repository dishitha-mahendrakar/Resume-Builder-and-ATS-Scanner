import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../resources/upload.css";
import swal from "sweetalert";
import Header from "../components/Header";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { CloudUpload, Assessment } from "@mui/icons-material";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

function FileUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [checkScoreDisabled, setCheckScoreDisabled] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Handle file selection
  const handleChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0];

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
    ];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError(null);
      setCheckScoreDisabled(false);
    } else {
      setFile(null);
      setError("Please select a valid .docx or .pdf file.");
      setCheckScoreDisabled(true);
    }
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("File", file); // MUST match multer: upload.single("File")

      const response = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        const msg =
          result?.message ||
          `Upload failed: ${response.status} ${response.statusText}`;
        throw new Error(msg);
      }

      swal({
        title: "File uploaded successfully",
        icon: "success",
      });

      setCheckScoreDisabled(false);
      setError(null);

      // Optional: auto go to result page after upload
      // navigate("/result");
    } catch (err) {
      console.error("Upload Error:", err);
      setError(err?.message || "An error occurred while uploading.");
      setCheckScoreDisabled(true);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <Container className="upload-container py-5 mt-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="text-center mb-5">
              <h1 className="display-5 mb-3">Resume Evaluation</h1>
              <p className="lead text-muted">
                Upload your resume and get instant ATS feedback
              </p>
            </div>

            <Form onSubmit={handleUpload}>
              <div
                className={`upload-area ${isDragging ? "dragging" : ""} ${
                  file ? "has-file" : ""
                }`}
              >
                <Form.Control
                  type="file"
                  onChange={handleChange}
                  accept=".docx,.pdf"
                  className="file-input"
                />
                <div className="upload-content">
                  <CloudUpload className="upload-icon" />
                  <p className="upload-text">
                    {file
                      ? file.name
                      : "Drag & drop your resume here or click to browse"}
                  </p>
                  <p className="upload-hint">
                    Accepts .docx or .pdf (text-based PDFs work best)
                  </p>
                </div>
              </div>

              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}

              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="d-flex align-items-center"
                  disabled={!file || isUploading}
                >
                  <CloudUpload className="me-2" />
                  {isUploading ? "Uploading..." : "Upload Resume"}
                </Button>

                <Button
                  variant="outline-primary"
                  size="lg"
                  onClick={() => navigate("/result")}
                  className="d-flex align-items-center"
                  disabled={checkScoreDisabled}
                >
                  <Assessment className="me-2" />
                  Check Score
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FileUpload;
