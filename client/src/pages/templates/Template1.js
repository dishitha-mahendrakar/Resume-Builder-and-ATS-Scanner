import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { LinkedinOutlined, MailOutlined, MobileOutlined } from "@ant-design/icons";
import "../../resources/templates.css";

const Template1 = () => {
  const defaultUser = {
    firstname: "",
    lastname: "",
    email: "",
    mobileNumber: "",
    portfolio: "", // (used as LinkedIn/Portfolio)
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
    const saved = localStorage.getItem("resume-user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser({ ...defaultUser, ...parsed }); // merge defaults + saved
      } catch (e) {
        setUser(defaultUser);
      }
    }
  }, []);

  return (
    <Container fluid className="template1-parent">
      {/* Header */}
      <header className="header1">
        <h1 className="mb-3 text-center">
          <b>
            {(user.firstname || "").toUpperCase()}{" "}
            {(user.lastname || "").toUpperCase()}
          </b>
        </h1>

        {user.objective && (
          <>
            <p className="lead">{user.objective}</p>
          </>
        )}
      </header>

      {/* Contact Bar */}
      <div className="divider1 bg-dark text-white">
        <div className="d-flex">
          <p className="m-0">
            {user.email && (
              <>
                <MailOutlined /> &ensp;{user.email} &emsp;
              </>
            )}

            {user.mobileNumber && (
              <>
                <MobileOutlined /> &ensp;{user.mobileNumber} &emsp;
              </>
            )}

            {user.portfolio && (
              <>
                <LinkedinOutlined /> &ensp;{user.portfolio} &emsp;
              </>
            )}

            {user.address && <>{user.address}</>}
          </p>
        </div>
      </div>

      {/* Content */}
      <Container className="content1 py-4">
        <Row>
          {/* LEFT COLUMN: Education, Experience, Courses, Interests, Co-curricular */}
          <Col md={6}>
            {/* Education */}
            {user.education?.length > 0 && (
              <section className="education mb-4">
                <h4 className="section-title">Education</h4>
                {user.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex gap-2">
                      <b>{edu.qualification}</b> : <p>{edu.range}</p>
                    </div>

                    <b>{edu.institution}</b>
                    <br />

                    <div className="d-flex gap-2">
                      <p>{edu.course}</p> :{" "}
                      <b className="print-percentage">{edu.percentage}</b>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Work Experience */}
            {user.experience?.length > 0 && (
              <section className="experience mt-4">
                <h4 className="section-title">Work Experience</h4>
                {user.experience.map((exp, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex gap-2 flex-wrap">
                      <b>{index + 1}.</b>
                      <b>{exp.designation}</b> : <b>{exp.company}</b>,{" "}
                      <b>{exp.place}</b>
                    </div>

                    <h6 className="text-nowrap me-3 d-flex gap-2 mt-2">
                      <b>{exp.range}</b>
                    </h6>

                    <p>{exp.description}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Courses */}
            {user.courses?.length > 0 && (
              <section className="courses mb-4">
                <h4 className="section-title">Courses</h4>

                {user.courses.map((course, idx) => (
                  <div key={idx} className="d-flex flex-column">
                    <h6>
                      <b>{course.name}</b>
                    </h6>
                    <p>{course.organization}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Interests */}
            {user.interests?.length > 0 && (
              <section className="interests">
                <h4 className="section-title">Interests</h4>


                {user.interests.map((interest, idx) => (
                  <p key={idx}>{interest.interests}</p>
                ))}
              </section>
            )}

            <br />

            {/* Co-Curricular Activities */}
            {user.cocurricular?.length > 0 && (
              <section>  
                <h4 className="section-title">Co-Curricular Activities</h4>


                {user.cocurricular.map((activity, idx) => (
                  <div key={idx} className="d-flex gap-2 flex-wrap">
                    <p className="m-0">{activity.activity}</p>:
                    <p className="m-0 d-flex">{activity.description}</p>
                  </div>
                ))}
              </section>
            )}
          </Col>

          {/* RIGHT COLUMN: Projects, Skills, Certificates */}
          <Col md={6}>
            {/* Personal Projects (ONLY ONCE) */}
            {user.projects?.length > 0 && (
              <section className="projects mb-4">
                <h4 className="section-title">Personal Projects</h4>

                {user.projects.map((project, index) => (
                  <div key={index} className="mb-3">
                    <h6>
                      <b>{project.title}</b>
                    </h6>
                    <p>{project.description}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Skills */}
            {user.skills?.length > 0 && (
              <section className="skills mb-4">
                <h4 className="section-title">Skills</h4>

                {user.skills.map((skill, index) => (
                  <div key={index} className="d-flex gap-2 flex-wrap">
                    <p className="mb-2">{skill.technology}</p>
                    {skill.rating ? (
                      <>
                        : <p className="mb-2">{skill.rating}</p>
                      </>
                    ) : null}
                  </div>
                ))}
              </section>
            )}

            {/* Certificates */}
            {user.certificates?.length > 0 && (
              <section className="certificates mb-4">
                <h4 className="section-title">Certificates</h4>

                {user.certificates.map((certificate, index) => (
                  <div key={index} className="mb-3">
                    <h6>
                      <b>{certificate.name}</b>
                    </h6>

                    {certificate.link ? (
                      <a href={certificate.link} target="_blank" rel="noreferrer">
                        {certificate.credential}
                      </a>
                    ) : (
                      <p>{certificate.credential}</p>
                    )}
                  </div>
                ))}
              </section>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Template1;
