import React, { useEffect, useState } from "react";
import { MailOutlined, MobileOutlined, LinkedinOutlined } from "@ant-design/icons";
import "../../resources/templates.css";

function Template5() {
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

  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("resume-user");
      if (saved) {
        const parsed = JSON.parse(saved);
        setUser({ ...defaultUser, ...parsed });
      }
    } catch (e) {
      setUser(defaultUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fullName = `${user.firstname || ""} ${user.lastname || ""}`.trim();

  return (
    <div className="template5-parent">
      {/* Header */}
      <div className="header1">
        <h1 className="mb-1">
          <b>{fullName ? fullName.toUpperCase() : "YOUR NAME"}</b>
        </h1>

        {user.objective && (
          <>
            <h6 className="mt-2 mb-1 section-label">Objective</h6>
            <p className="mb-0">{user.objective}</p>
          </>
        )}
      </div>

      {/* Contact Bar */}
      <div className="divide1">
        <div className="top d-flex justify-content-center">
          <p className="mb-0">
            {user.email && (
              <>
                <MailOutlined />&ensp;{user.email}&emsp;&emsp;
              </>
            )}
            {user.mobileNumber && (
              <>
                <MobileOutlined />&ensp;{user.mobileNumber}&emsp;&emsp;
              </>
            )}
            {user.portfolio && (
              <>
                <LinkedinOutlined />&ensp;
                <a href={user.portfolio} target="_blank" rel="noreferrer">
                  {user.portfolio}
                </a>
                &emsp;&emsp;
              </>
            )}
            {user.address && <>{user.address}</>}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="content1 template5-columns">
        {/* Left Column */}
        <div className="divone">
          {/* Education */}
          {(user.education || []).length > 0 && (
            <section className="education mt-3">
              <h4 className="section-title">
                <b>Education</b>
              </h4>
              {user.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <div className="d-flex gap-2">
                    <b>{edu.qualification}</b>
                    <span>•</span>
                    <p className="mb-0">{edu.range}</p>
                  </div>
                  <b>{edu.institution}</b>
                  <div className="d-flex gap-2">
                    <p className="mb-0">{edu.course}</p>
                    <span>•</span>
                    <b className="print-percentage">{edu.percentage}</b>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Work Experience */}
          {(user.experience || []).length > 0 && (
            <section className="experience mt-3">
              <h4 className="section-title">
                <b>Work Experience</b>
              </h4>
              {user.experience.map((exp, index) => (
                <div key={index} className="mb-2">
                  <div className="d-flex flex-wrap gap-2">
                    <b>{exp.designation}</b>
                    <span>•</span>
                    <b>{exp.company}</b>
                    {exp.place ? (
                      <>
                        <span>•</span>
                        <b>{exp.place}</b>
                      </>
                    ) : null}
                  </div>
                  {exp.range && (
                    <h6 className="mb-1">
                      <b>{exp.range}</b>
                    </h6>
                  )}
                  {exp.description && <p className="mb-0">{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Interests */}
          {(user.interests || []).length > 0 && (
            <section className="interests mt-3">
              <h4 className="section-title">
                <b>Interests</b>
              </h4>
              {user.interests.map((interest, index) => (
                <p key={index} className="mb-1">
                  {interest.interests}
                </p>
              ))}
            </section>
          )}

          {/* Co-Curricular */}
          {(user.cocurricular || []).length > 0 && (
            <section className="interests mt-3">
              <h4 className="section-title">
                <b>Co-Curricular Activities</b>
              </h4>
              {user.cocurricular.map((activity, index) => (
                <div className="d-flex gap-2" key={index}>
                  <p className="mb-0">
                    <b>{activity.activity}</b>
                  </p>
                  <p className="mb-0">{activity.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="divtwo">
          {/* Projects */}
          {(user.projects || []).length > 0 && (
            <section className="projects mt-3">
              <h4 className="section-title">
                <b>Personal Projects</b>
              </h4>
              {user.projects.map((project, index) => (
                <div key={index} className="mb-2">
                  <h6 className="mb-1">
                    <b>{project.title}</b>
                  </h6>
                  <p className="mb-0">{project.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {(user.skills || []).length > 0 && (
            <section className="skills mt-3">
              <h4 className="section-title">
                <b>Skills</b>
              </h4>
              {user.skills.map((skill, index) => (
                <p key={index} className="mb-1">
                  {skill.technology}
                </p>
              ))}
            </section>
          )}

          {/* Certificates */}
          {(user.certificates || []).length > 0 && (
            <section className="certificates mt-3">
              <h4 className="section-title">
                <b>Certificates</b>
              </h4>
              {user.certificates.map((certificate, index) => (
                <div className="mb-2" key={index}>
                  <h6 className="mb-1">
                    <b>{certificate.name}</b>
                  </h6>
                  <p className="mb-0">{certificate.credential}</p>
                </div>
              ))}
            </section>
          )}

          {/* Courses */}
          {(user.courses || []).length > 0 && (
            <section className="courses mt-3">
              <h4 className="section-title">
                <b>Courses</b>
              </h4>
              {user.courses.map((course, index) => (
                <div className="mb-2" key={index}>
                  <h6 className="mb-1">
                    <b>{course.name}</b>
                  </h6>
                  <p className="mb-0">{course.organization}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default Template5;
