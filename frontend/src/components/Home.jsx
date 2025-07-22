import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaShieldAlt, FaFileAlt, FaChartLine, FaBolt, FaLock, FaUsers, FaCheckCircle, FaStar } from "react-icons/fa";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container-fluid mt-5 p-5  bg-light text-dark mt-3 min-vh-100">
      {/* Hero Section */}
      <header
        className="text-center text-white py-5 rounded shadow-lg"
        data-aos="fade-down"
        style={{
          background: "linear-gradient(135deg, #2a2a72, #009ffd)",
          marginBottom: "40px",
        }}
      >
        <h1 className="display-4 fw-bold">Welcome to EmailGuard</h1>
        <p className="lead">
          Protect your emails with cutting-edge security and smart organization.
        </p>
        <a href="#features" className="btn btn-light btn-lg mt-3 shadow" data-aos="zoom-in">
          Get Started
        </a>
      </header>

      {/* Features Section */}
      <section id="features" className="container">
        <div className="row g-4 justify-content-center">
          {/* Smart Protection Feature */}
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in">
            <div className="card shadow-lg border-0 p-4 bg-white text-dark rounded-4 w-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <FaShieldAlt className="text-primary fs-1 me-3" />
                  <h5 className="fw-bold mb-0">Smart Protection</h5>
                </div>
                <p className="text-muted mb-3">
                  Our AI-powered security system ensures your emails are protected against phishing, spam, and malware.
                </p>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center"><FaCheckCircle className="text-success me-2" /> 99.99% spam detection accuracy</li>
                  <li className="d-flex align-items-center"><FaLock className="text-success me-2" /> Advanced encryption for data security</li>
                  <li className="d-flex align-items-center"><FaChartLine className="text-success me-2" /> Real-time threat monitoring</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Email Summarization Feature */}
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in">
            <div className="card shadow-lg border-0 p-4 bg-white text-dark rounded-4 w-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <FaFileAlt className="text-primary fs-1 me-3" />
                  <h5 className="fw-bold mb-0">Email Summarization</h5>
                </div>
                <p className="text-muted">
                  Save time by getting concise summaries of long email threads, reducing email clutter.
                </p>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center"><FaBolt className="text-success me-2" /> Instant AI-generated summaries</li>
                  <li className="d-flex align-items-center"><FaCheckCircle className="text-success me-2" /> Supports multiple languages</li>
                  <li className="d-flex align-items-center"><FaStar className="text-success me-2" /> Customizable summary formats</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Email Classification Feature */}
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in">
            <div className="card shadow-lg border-0 p-4 bg-white text-dark rounded-4 w-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <FaChartLine className="text-primary fs-1 me-3" />
                  <h5 className="fw-bold mb-0">Email Classification</h5>
                </div>
                <p className="text-muted">
                  Automatically sort emails into categories like work, personal, promotions, and spam.
                </p>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center"><FaChartLine className="text-success me-2" /> AI-powered category detection</li>
                  <li className="d-flex align-items-center"><FaUsers className="text-success me-2" /> Priority-based sorting</li>
                  <li className="d-flex align-items-center"><FaBolt className="text-success me-2" /> Smart organization suggestions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose EmailGuard? */}
      <section className="text-center my-5 py-5 bg-secondary text-white rounded shadow-lg" data-aos="fade-up">
        <h2 className="fw-bold">Why Choose EmailGuard?</h2>
        <p className="lead">Our advanced security features ensure safe and efficient email management.</p>
        <div className="row g-4 justify-content-center">
          <div className="col-lg-3 col-md-6" data-aos="fade-up">
            <h5><FaLock className="text-light fs-2 mb-2" /> Strong Security</h5>
            <p>End-to-end encryption ensures your emails stay private and secure.</p>
          </div>
          <div className="col-lg-3 col-md-6" data-aos="fade-up">
            <h5><FaBolt className="text-light fs-2 mb-2" /> Smart Automation</h5>
            <p>Automatically sorts, filters, and prioritizes your emails, making inbox management easier and more efficient.</p>
          </div>
          <div className="col-lg-3 col-md-6" data-aos="fade-up">
            <h5><FaUsers className="text-light fs-2 mb-2" /> User-Friendly</h5>
            <p>Simple and intuitive interface designed for ease of use.</p>
          </div>
          <div className="col-lg-3 col-md-6" data-aos="fade-up">
            <h5><FaStar className="text-light fs-2 mb-2" /> Highly Rated</h5>
            <p>Trusted by thousands of users worldwide.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-white py-4" style={{ background: "linear-gradient(135deg, #1e3c72, #2a5298)" }}>
  <p className="mb-1">© {new Date().getFullYear()} EmailGuard. All rights reserved.</p>
  <p className="mb-1">Enhancing your email experience with security and efficiency.</p>
  <p className="mb-0">
    Contact us: <a href="mailto:support@emailguard.com" className="text-white text-decoration-none">support@emailguard.com</a>
  </p>
</footer>

    </div>
  );
};

export default Home;