import React from "react";
import { Container, Button, Carousel } from "react-bootstrap";
import { ThemeProvider, createTheme } from "@mui/material";
import TypeWriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import "../resources/landing.css";
import Header from "../components/Header";

function Home() {
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#2196f3",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="home-page bg-dark text-light">
        {/* Navbar */}
        <Header />

        {/* Hero Section */}
        <section className="hero vh-100 d-flex align-items-center position-relative">
          <div className="hero-overlay position-absolute w-100 h-100"></div>
          <Container className="position-relative">
            <div className="typewriter-effect">
              <TypeWriter
                options={{
                  strings: [
                      "Transform Your Resume in Minutes",
                      "Show Hiring Managers Your Best Self",
                      "Turn Campus Projects Into Career Wins",
                      "Make Every Line of Your Resume Count",
                      "From Draft to Job-Ready Resume, Fast",

                  ],
                  delay: 70,
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </div>

            <p className="lead mb-5">
              Create a clear, ATS‑friendly resume that highlights your strengths in just a few clicks.

            </p>
            <Button
              variant="primary"
              size="lg"
              href="#templates"
              className="pulse-button"
            >
              Get Started
            </Button>
          </Container>
        </section>

        {/* Templates Section */}
        <section id="templates" className="py-5 bg-dark">
          <Container>
            <h2 className="text-center mb-5">Professional Templates</h2>
            <Carousel className="templates-carousel">
              <Carousel.Item>
                <div
                  className="template-preview"
                  onClick={() => navigate("/templates/1")}
                >
                  <img
                    src={require("../resources/templateImages/Template-1.png")}
                    className="img-fluid w-auto object-fit-cover"
                    alt="Template 1"
                    style={{ height: "300px" }}
                    loading="lazy"
                  />
                  <h3>Simple Professional</h3>
                  <p>Clean and traditional layout perfect for any industry</p>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div
                  className="template-preview"
                  onClick={() => navigate("/templates/4")}
                >
                  <img
                    src={require("../resources/templateImages/Template-4.png")}
                    className="img-fluid w-auto object-fit-cover"
                    alt="Template 4"
                    style={{ height: "300px" }}
                    loading="lazy"
                  />
                  <h3>Creative Resume</h3>
                  <p>Contemporary design for creative professionals</p>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div
                  className="template-preview"
                  onClick={() => navigate("/templates/6")}
                >
                  <img
                    src={require("../resources/templateImages/Template-6.png")}
                    className="img-fluid w-auto object-fit-cover"
                    alt="Template 6"
                    style={{ height: "300px" }}
                    loading="lazy"
                  />
                  <h3>Modern Premium</h3>
                  <p>Sophisticated layout for senior positions</p>
                </div>
              </Carousel.Item>
            </Carousel>
            <div className="text-center mt-4">
              <Button
                variant="outline-light"
                size="lg"
                onClick={() => navigate("/template")}
              >
                View All Templates
              </Button>
            </div>
          </Container>
        </section>

        {/* About Section */}
        <section id="about" className="py-5 bg-darker">
          <Container>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h2 className="mb-4">About Resumaid</h2>
                <p className="lead mb-4">
                  Welcome to Resumaid, your ultimate destination for creating
                  the perfect resume. We combine professional templates to help
                  you stand out in today's competitive job market.
                </p>
                <div className="mt-4">
                  <h4>Our Features</h4>
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      ✓ Explore 6 Premium Resume Templates for a Professional
                      and Polished Look
                    </li>
                    <li className="mb-3">✓ Expert ATS Suggestions</li>
                    <li className="mb-3">✓ Easy-to-Use Interface</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-image-container">
                  <div className="about-image-placeholder bg-gradient">
                    <img
                      src={require("../resources/templateImages/Template-1_HD.png")}
                      alt="About Resumes"
                      className=" w-100"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Our Team Section (names + USN, no contact details) */}
        <section id="team" className="py-5 bg-dark">
          <Container>
            <div className="row">
              <div className="col-lg-12">
                <h4 className="mb-4">Our Team</h4>
                <div className="team-members">
                  <div className="team-member mb-3">
                    <h5 className="mb-1">Dishitha Mahendrakar</h5>
                    <p className="mb-2">PES1PG25CS080</p>
                  </div>

                  <div className="team-member mb-3">
                    <h5 className="mb-1">Ramya K Deshpande</h5>
                    <p className="mb-2">PES1PG25CS087</p>
                  </div>

                  <div className="team-member mb-3">
                    <h5 className="mb-1">S Shree Nithya Keerthi</h5>
                    <p className="mb-2">PES1PG25CS089</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        
      </div>
    </ThemeProvider>
  );
}

export default Home;