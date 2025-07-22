import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  // Function to scroll to the Key Features section
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("key-features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#E6E6FA" }} // Lavender background color
    >
      <div className="container mt-5">
        {/* Header Section with Gradient Background */}
        <div
          className="text-center p-5 rounded shadow-lg"
          style={{
            background: "linear-gradient(135deg, #2a2a72, #009ffd)",
            color: "white",
          }}
        >
          <h1 className="fw-bold">About Our Project</h1>
          <p className="lead mt-3">
            A powerful MERN-based email management system that classifies spam and summarizes emails efficiently.
          </p>
        </div>

        {/* Content Section */}
        <div className="row mt-5 align-items-center">
          {/* Left: Image */}
          <div className="col-md-6 text-center">
            <img
              src="https://quatraincreative.com/wp-content/uploads/how-to-write-a-professional-email-5-easy-tips-to-writing-a-better-email-scaled.jpg"
              alt="Email Management"
              className="img-fluid rounded shadow-lg"
            />
          </div>

          {/* Right: Description */}
          <div className="col-md-6">
            <h3 className="fw-bold text-dark">Efficient Email Management with MERN</h3>
            <p className="text-muted lead">
              Our <strong>Spam Mail Classification & Email Summarization</strong> project uses the <strong>MERN Stack</strong> to enhance email management through a smooth, automated process.
            </p>

            <div className="card shadow-sm border-0 mt-4">
              <div className="card-body">
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <span className="fw-bold text-primary">📌 MongoDB:</span> Securely stores email metadata.
                  </li>
                  <li className="mb-3">
                    <span className="fw-bold text-success">🚀 Express.js:</span> Handles backend API requests seamlessly.
                  </li>
                  <li className="mb-3">
                    <span className="fw-bold text-danger">⚡ React.js:</span> Provides a dynamic user experience.
                  </li>
                  <li className="mb-3">
                    <span className="fw-bold text-info">🔗 Node.js:</span> Ensures fast and scalable backend processing.
                  </li>
                </ul>
              </div>
            </div>

            {/* Call to Action Button (Modified for Scroll) */}
            <div className="mt-4">
              <button className="btn btn-dark btn-lg shadow-lg px-4 py-2" onClick={scrollToFeatures}>
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="key-features" className="mt-5">
          <h2 className="text-center fw-bold text-dark mb-4">Key Features</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="card shadow-sm border-0 p-4">
                <h4 className="text-primary">🔍 Spam Detection</h4>
                <p>Filters out spam emails with high accuracy.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm border-0 p-4">
                <h4 className="text-success">📜 Email Summarization</h4>
                <p>Generates concise summaries for quick reading.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm border-0 p-4">
                <h4 className="text-danger">⚡ Fast & Secure</h4>
                <p>Optimized for performance and security.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-5">
          <h2 className="text-center fw-bold text-dark mb-4">Why Choose Our Solution?</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="card shadow-lg border-0 p-4">
                <h4 className="text-warning">💡 Innovative</h4>
                <p>Uses the latest web technologies for seamless email management.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-lg border-0 p-4">
                <h4 className="text-info">🔧 Easy to Integrate</h4>
                <p>Can be easily integrated into existing email systems using Gmail APIs.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-lg border-0 p-4">
                <h4 className="text-danger">🛡 Secure</h4>
                <p>Ensures data privacy and security with encrypted storage.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-5">
          <p className="text-muted">
            "Transform the way you handle emails with MERN-powered efficiency!" 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;