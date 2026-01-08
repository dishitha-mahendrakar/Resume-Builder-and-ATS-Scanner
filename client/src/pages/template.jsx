import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import templateimg1 from "../resources/templateImages/Template-1.png";
import templateimg2 from "../resources/templateImages/Template-2.png";
import templateimg3 from "../resources/templateImages/Template-3.png";
import templateimg4 from "../resources/templateImages/Template-4.png";
import templateimg5 from "../resources/templateImages/Template-5.png";
import templateimg6 from "../resources/templateImages/Template-6.png";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5001";

const templates = [
  { title: "Simple Resume", image: templateimg1 },
  { title: "College Resume", image: templateimg2 },
  { title: "Basic Resume", image: templateimg3 },
  { title: "Creative Resume", image: templateimg4 },
  { title: "Executive Resume", image: templateimg5 },
  { title: "Modern Resume", image: templateimg6 },
];

// helpers: make templates happy (they expect arrays for some fields)
const asArray = (v) => {
  if (!v) return [];
  if (Array.isArray(v)) return v.filter(Boolean);
  if (typeof v === "string") {
    // split by newlines/commas if it's a single string
    return v
      .split(/\n|,/g)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

function Template() {
  const navigate = useNavigate();

  const handleTry = async (templateIndex) => {
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("jwtToken");

      const res = await fetch(`${API_BASE}/api/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
      });

      if (res.status === 401) {
        // not logged in → go login
        navigate("/login");
        return;
      }

      if (!res.ok) {
        throw new Error(`Profile fetch failed: ${res.status}`);
      }

      const profile = await res.json();

      // Normalize fields so ALL templates can render reliably
      const normalized = {
        ...profile,
        skills: asArray(profile.skills),
        education: asArray(profile.education),
        experience: asArray(profile.experience),
        projects: asArray(profile.projects),
        certificates: asArray(profile.certificates || profile.certification),
        courses: asArray(profile.courses),
        achievements: asArray(profile.achievements),
        profiles: asArray(profile.profiles || profile.links), // LinkedIn often ends up in links
      };

      localStorage.setItem("resume-user", JSON.stringify(normalized));

      navigate(`/templates/${templateIndex + 1}`);
    } catch (err) {
      console.error(err);
      // fallback: still navigate, but you’ll likely see blanks
      navigate(`/templates/${templateIndex + 1}`);
    }
  };

  return (
    <div className="row home">
      <Header />
      <br />
      <br />
      <br />
      <div className="row home">
        {templates.map((template, index) => (
          <div key={index} className="col-md-4 d-flex justify-content-center">
            <div className="template">
              <img
                src={template.image}
                height="400"
                alt={template.title}
                loading="lazy"
              />
              <div className="text">
                <p>{template.title}</p>
                <button onClick={() => handleTry(index)}>
                  <b>TRY</b>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Template;
