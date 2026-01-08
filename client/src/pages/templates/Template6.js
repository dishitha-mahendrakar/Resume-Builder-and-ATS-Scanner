import React, { useEffect, useMemo, useState } from "react";
import { MailOutlined, MobileOutlined, LinkedinOutlined } from "@ant-design/icons";
import "../../resources/templates.css";

function Template6() {
  const defaultUser = useMemo(
    () => ({
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
    }),
    []
  );

  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    const saved = localStorage.getItem("resume-user");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setUser({ ...defaultUser, ...parsed });
    } catch (e) {
      console.error("Invalid resume-user in localStorage", e);
      setUser(defaultUser);
    }
  }, [defaultUser]);

  const fullName = `${(user.firstname || "").toUpperCase()} ${(user.lastname || "").toUpperCase()}`.trim();

  return (
    <div className="template6-parent">
      {/* HEADER */}
      <div className="header1">
        <h1 className="name">{fullName || " "}</h1>

        {user.objective ? (
          <div className="objective-block">
            <div className="objective-title">Objective</div>
            <p className="objective-text">{user.objective}</p>
          </div>
        ) : null}
      </div>

      {/* CONTACT BAR */}
      <div className="divide1 contact-bar">
        {user.email ? (
          <span className="contact-item">
            <MailOutlined /> <span className="contact-text">{user.email}</span>
          </span>
        ) : null}

        {user.mobileNumber ? (
          <span className="contact-item">
            <MobileOutlined /> <span className="contact-text">{user.mobileNumber}</span>
          </span>
        ) : null}

        {user.portfolio ? (
          <span className="contact-item">
            <LinkedinOutlined />{" "}
            <span className="contact-text">{user.portfolio}</span>
          </span>
        ) : null}

        {user.address ? <span className="contact-item">{user.address}</span> : null}
      </div>

      {/* MAIN CONTENT (2-COLUMN FLEX - PRINT SAFE) */}
      <div className="content1 template6-columns">
        {/* LEFT COLUMN */}
        <div className="divone">
          {/* Work Experience */}
          {Array.isArray(user.experience) && user.experience.length > 0 ? (
            <section className="experience">
              <h4 className="section-title">Work Experience</h4>

              {user.experience.map((exp, index) => (
                <div key={index} className="block">
                  <div className="line">
                    <b>{index + 1}.</b> <b>{exp.designation}</b>
                    {exp.company ? (
                      <>
                        {" "}
                        : <b>{exp.company}</b>
                      </>
                    ) : null}
                    {exp.place ? <> , <b>{exp.place}</b></> : null}
                  </div>

                  {exp.range ? <div className="muted">{exp.range}</div> : null}
                  {exp.description ? <p className="para">{exp.description}</p> : null}
                </div>
              ))}
            </section>
          ) : null}

          {/* Skills */}
          {Array.isArray(user.skills) && user.skills.length > 0 ? (
            <section className="skills">
              <h4 className="section-title">Skills</h4>
              {user.skills.map((skill, index) => (
                <div key={index} className="line">
                  {skill.technology}
                </div>
              ))}
            </section>
          ) : null}

          {/* Certificates */}
          {Array.isArray(user.certificates) && user.certificates.length > 0 ? (
            <section className="certificates">
              <h4 className="section-title">Certificates</h4>
              {user.certificates.map((c, index) => (
                <div key={index} className="block">
                  <div className="line">
                    <b>{c.name}</b>
                  </div>
                  {c.credential ? <div className="muted">{c.credential}</div> : null}
                </div>
              ))}
            </section>
          ) : null}

          {/* Courses */}
          {Array.isArray(user.courses) && user.courses.length > 0 ? (
            <section className="courses">
              <h4 className="section-title">Courses</h4>
              {user.courses.map((course, index) => (
                <div key={index} className="block">
                  <div className="line">
                    <b>{course.name}</b>
                  </div>
                  {course.organization ? <div className="muted">{course.organization}</div> : null}
                </div>
              ))}
            </section>
          ) : null}
        </div>

        {/* RIGHT COLUMN */}
        <div className="divtwo">
          {/* Projects */}
          {Array.isArray(user.projects) && user.projects.length > 0 ? (
            <section className="projects">
              <h4 className="section-title">Personal Projects</h4>
              {user.projects.map((p, index) => (
                <div key={index} className="block">
                  <div className="line">
                    <b>{p.title}</b>
                  </div>
                  {p.description ? <p className="para">{p.description}</p> : null}
                </div>
              ))}
            </section>
          ) : null}

          {/* Education */}
          {Array.isArray(user.education) && user.education.length > 0 ? (
            <section className="education">
              <h4 className="section-title">Education</h4>

              {user.education.map((e, index) => (
                <div key={index} className="block">
                  <div className="line">
                    <b>{e.qualification}</b>
                    {e.range ? <span className="muted"> : {e.range}</span> : null}
                  </div>

                  {e.institution ? <div className="line"><b>{e.institution}</b></div> : null}

                  {(e.course || e.percentage) ? (
                    <div className="line">
                      {e.course ? <span>{e.course}</span> : null}
                      {e.percentage ? <span className="muted">{e.course ? " : " : ""}{e.percentage}</span> : null}
                    </div>
                  ) : null}
                </div>
              ))}
            </section>
          ) : null}

          {/* Interests */}
          {Array.isArray(user.interests) && user.interests.length > 0 ? (
            <section className="interests">
              <h4 className="section-title">Interests</h4>
              {user.interests.map((i, index) => (
                <div key={index} className="line">
                  {i.interests}
                </div>
              ))}
            </section>
          ) : null}

          {/* Co-Curricular */}
          {Array.isArray(user.cocurricular) && user.cocurricular.length > 0 ? (
            <section className="cocurricular">
              <h4 className="section-title">Co-Curricular Activities</h4>
              {user.cocurricular.map((a, index) => (
                <div key={index} className="block">
                  <div className="line">
                    <b>{a.activity}</b>
                  </div>
                  {a.description ? <div className="muted">{a.description}</div> : null}
                </div>
              ))}
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Template6;
