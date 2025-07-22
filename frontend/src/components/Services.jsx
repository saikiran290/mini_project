import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelopeOpenText, FaShieldAlt } from "react-icons/fa";
import "animate.css";
import {Link} from 'react-router-dom'

const Services = () => {
  return (
    <div className="mt-5 p-5 rounded" style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#F0F0F3" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #2a2a72, #009ffd)",
          color: "#fff",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h1 className="fw-bold animate_animated animate_fadeInDown">Our Services</h1>
        <p className="animate_animated animate_fadeInUp">
          Efficiently manage your emails with our powerful tools.
        </p>
      </section>

      {/* Services Section */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Email Summarization Section */}
          <div className="col-md-6">
            <div className="service-section animate_animated animate_fadeInLeft">
              <div className="icon-box">
                <Link to='/mail'><FaEnvelopeOpenText size={50} color="#4B0082" /></Link>
              </div>
              <h3 className="fw-bold">1️⃣ Email Summarization</h3>
              
              <h5 className="fw-bold text-danger">📩 Problem:</h5>
              <p>Reading long emails can be time-consuming and overwhelming, especially when dealing with multiple emails daily.</p>

              <h5 className="fw-bold text-success">💡 Solution:</h5>
              <p>Our Email Summarization feature extracts key points from lengthy emails, providing a concise summary so users can quickly understand the important details without reading the entire email.</p>

              <h5 className="fw-bold text-primary">🔹 How It Works:</h5>
              <ul>
                <li>📌 The system scans the email content.</li>
                <li>📌 Identifies and extracts the most relevant sentences.</li>
                <li>📌 Generates a short summary highlighting key details.</li>
              </ul>

              <h5 className="fw-bold text-warning">✅ Benefits:</h5>
              <ul>
                <li>✔ Saves time by reducing the need to read long emails.</li>
                <li>✔ Helps in quickly identifying important information.</li>
                
              </ul>
            </div>
          </div>

          {/* Spam Mail Classification Section */}
          <div className="col-md-6">
            <div className="service-section animate_animated animate_fadeInRight">
              <div className="icon-box">
              <Link to='/mail'><FaShieldAlt size={50} color="#4B0082" /></Link>
              </div>
              <h3 className="fw-bold">2️⃣ Spam Mail Classification</h3>
              
              <h5 className="fw-bold text-danger">📩 Problem:</h5>
              <p>Spam emails clutter inboxes, making it harder to find important messages and increasing the risk of phishing attacks.</p>

              <h5 className="fw-bold text-success">💡 Solution:</h5>
              <p>Our Spam Mail Classification feature automatically filters out unwanted and spam emails, ensuring a clean and organized inbox.</p>

              <h5 className="fw-bold text-primary">🔹 How It Works:</h5>
              <ul>
                <li>📌 The system checks incoming emails based on specific patterns.</li>
                <li>📌 Categorizes emails as spam or legitimate based on predefined rules.</li>
                <li>📌 Moves spam emails to a separate folder, keeping the inbox clean.</li>
              </ul>

              <h5 className="fw-bold text-warning">✅ Benefits:</h5>
              <ul>
                <li>✔ Reduces distractions by eliminating unnecessary emails.</li>
                <li>✔ Helps users focus only on relevant messages.</li>
                <li>✔ Enhances security by filtering out potential phishing emails.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="container text-center py-5">
        <h2 className="fw-bold animate_animated animate_zoomIn">🚀 Why Use Our Services?</h2>
        <p className="text-muted">We simplify email management to save you time and effort.</p>
        <div className="row justify-content-center g-4">
          <div className="col-md-3">
            <div className="choose-box animate_animated animate_fadeInUp">
              <h5 className="fw-bold">✅ Efficient Email Management</h5>
              <p>Saves time by summarizing important content.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="choose-box animate_animated animate_fadeInUp" style={{ animationDelay: "0.2s" }}>
              <h5 className="fw-bold">✅ Clutter-Free Inbox</h5>
              <p>Simple, fast, and effective email handling for better organization, security, and efficiency</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="choose-box animate_animated animate_fadeInUp" style={{ animationDelay: "0.4s" }}>
              <h5 className="fw-bold">✅ User-Friendly Experience</h5>
              <p>Simple, fast, and effective email handling.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          background: "#4B0082",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <p className="mb-0">© {new Date().getFullYear()} Email Management System. All rights reserved.</p>
      </footer>

      {/* CSS Styling */}
      <style>
        {`
          .service-section {
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(10px);
            border-radius: 10px;
            padding: 30px;
            width: 100%;
            text-align: left;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            border-left: 5px solid #4B0082;
          }

          .service-section:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
          }

          .icon-box {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background: #fff;
            border-radius: 50%;
            margin-bottom: 15px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          }

          .choose-box {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(8px);
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }

          .choose-box:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </div>
  );
};

export default Services;