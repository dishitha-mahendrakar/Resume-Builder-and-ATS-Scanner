import React, { useEffect, useState } from "react";
import {
  LinkedinOutlined,
  MailOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import "../../resources/templates.css";

function Template4() {
  const defaultUser = {
    firstname: "",
    lastname: "",
    email: "",
    mobileNumber: "",
    portfolio: "",
    address: "",
    objective: "",
    experience: [],
    skills: [],
    certificates: [],
    courses: [],
    projects: [],
    education: [],
    interests: [],
    cocurricular: [],
  };

  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("resume-user"));
    return savedUser ? { ...defaultUser, ...savedUser } : defaultUser;
  });

  useEffect(() => {
    const updatedUser = JSON.parse(localStorage.getItem("resume-user"));
    if (updatedUser) {
      setUser({ ...defaultUser, ...updatedUser });
    }
  }, []);

  return (
    <div className="template4-parent">
      {/* ✅ Header ONLY - Name + Objective */}
      <div className="header1">
        <h1>
          <b>
            {user.firstname ? user.firstname.toUpperCase() : "First Name"}{" "}
            {user.lastname ? user.lastname.toUpperCase() : "Last Name"}
          </b>
        </h1>
        {user.objective && (
          <>
            <h6 className="text-left">Objective</h6>
            <p>{user.objective}</p>
          </>
        )}
      </div>

      {/* ✅ Contact Bar - SEPARATE from header */}
      <div className="contact-bar">
        <span>
          <MailOutlined /> {user.email || "email@example.com"}
        </span>
        <span>
          <MobileOutlined /> {user.mobileNumber || "1234567890"}
        </span>
        <span>
          <LinkedinOutlined /> {user.portfolio || "linkedin.com/in/profile"}
        </span>
        <span>{user.address || "City, Country"}</span>
      </div>

      {/* Main Content - 2 Columns */}
      <div className="content1">
        <div className="divone">
          {/* Education - ✅ Clean no colons */}
          {user.education.length > 0 && (
            <section className="education mt-4">
              <h4><u><b>Education</b></u></h4>
              {user.education.map((education, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex gap-2">
                    <b>{education.qualification}</b> {education.range}
                  </div>
                  <b>{education.institution}</b>
                  <div className="d-flex gap-2">
                    <p>{education.course}</p>
                    <b>{education.percentage}</b>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* 🔥 Work Experience - Company BELOW Role */}
          {user.experience.length > 0 && (
            <section className="experience mt-4">
              <h4><u><b>Work Experience</b></u></h4>
              {user.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="d-flex gap-2 align-items-start">
                    <b style={{minWidth: '20px'}}>{index + 1}.</b>
                    <div style={{flex: 1}}>
                      <div><b>{exp.designation}</b></div>
                      <div className="company-info">{exp.company}, {exp.place}</div>
                    </div>
                  </div>
                  <h6 className="mt-2"><b>{exp.range}</b></h6>
                  <p className="mt-2">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Courses */}
          {user.courses.length > 0 && (
            <div className="courses mt-4">
              <h4><b><u>Courses</u></b></h4>
              {user.courses.map((course, index) => (
                <div key={index}>
                  <h6><b>{course.name}</b></h6>
                  <p>{course.organization}</p>
                </div>
              ))}
            </div>
          )}

          {/* Co-Curricular */}
          {user.cocurricular.length > 0 && (
            <section className="interests mt-4">
              <h4><u><b>Co-Curricular Activities</b></u></h4>
              {user.cocurricular.map((activity, index) => (
                <div key={index} className="mb-2">
                  <b>{activity.activity}</b>: {activity.description}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="divtwo">
          {/* Projects */}
          {user.projects.length > 0 && (
            <div className="projects mt-4">
              <h4><b><u>Personal Projects</u></b></h4>
              {user.projects.map((project, index) => (
                <div className="mb-3" key={index}>
                  <h6><b>{project.title}</b></h6>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills - ✅ Clean */}
          {user.skills.length > 0 && (
            <section className="skills mt-4">
              <h4><u><b>Skills</b></u></h4>
              {user.skills.map((skill, index) => (
                <p key={index} className="mb-2">{skill.technology}</p>
              ))}
            </section>
          )}

          {/* Certificates */}
          {user.certificates.length > 0 && (
            <section className="certificates mt-4">
              <h4><b><u>Certificates</u></b></h4>
              {user.certificates.map((certificate, index) => (
                <div key={index} className="mb-3">
                  <h6><b>{certificate.name}</b></h6>
                  <p>{certificate.credential}</p>
                </div>
              ))}
            </section>
          )}

          {/* Interests */}
          {user.interests.length > 0 && (
            <section className="interests mt-4">
              <h4><b><u>Interests</u></b></h4>
              {user.interests.map((interest, index) => (
                <p key={index}>{interest.interests}</p>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default Template4;
