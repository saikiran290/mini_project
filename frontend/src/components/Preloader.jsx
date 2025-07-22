import React, { useState, useEffect } from "react";
import "animate.css"; // Import Animate.css for animations
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const EmailGuardAnimation = () => {
  const [showHome, setShowHome] = useState(false);
  const [showElements, setShowElements] = useState(true); // Control visibility of all elements

  // Typing effect for text
  const typingEffect = () => {
    let text = "Email Guard";
    let i = 0;
    let element = document.getElementById("typedText");
    let interval = setInterval(() => {
      element.innerHTML += text.charAt(i);
      i++;
      if (i === text.length) clearInterval(interval);
    }, 265); // Adjust speed of typing effect
  };

  useEffect(() => {
    // Show the homepage after 3 seconds
    setTimeout(() => {
      setShowHome(true);
    }, 500);

    // Trigger typing effect after 1 second
    setTimeout(() => {
      typingEffect();
    }, 1000);

    // Hide all elements after 10 seconds
    setTimeout(() => {
      setShowElements(false);
    }, 10000); // Hide after 10 seconds
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "#2c3e50", // Dark background
        position: "relative",
      }}
    >
      {/* Preloader Animation */}
      {showElements && (
        <div className="text-center">
          <h1
            id="typedText"
            className="text-white display-1 animate_animated animatefadeIn animatedelay-1s animate_slower"
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: "bold",
            }}
          >
            {/* EmailGuard will be typed dynamically here */}
          </h1>

          {/* Optional Button with bounce animation after typing is complete */}
          {showHome && (
            <div>
              <button
                className="btn btn-primary btn-lg animate_animated animate_bounceInUp"
                style={{
                  marginTop: "20px",
                  fontWeight: "bold",
                  fontSize: "1.5rem", // Larger font size for emphasis
                  padding: "12px 30px", // More padding for a better click target
                  borderRadius: "30px", // Rounded corners for a smoother appearaance
                  background: "linear-gradient(135deg, #3498db, #8e44ad)", // Gradient background
                  border: "none", // Remove border for a cleaner look
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow for floating effect
                  transition: "all 0.3s ease", // Smooth transition for hover effect
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.1)"; // Slightly enlarge the button on hover
                  e.target.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.3)"; // Enhanced shadow on hover
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)"; // Revert back to original size
                  e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)"; // Original shadow
                }}
              >
                Welcome to EmailGuard
              </button>

              <p className="text-white mt-3">Your security is our priority.</p>
            </div>
          )}
        </div>
      )}

      {/* Optional background animation (glowing effect) */}
      {showElements && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(45deg, #3498db, #8e44ad)",
            opacity: 0.4,
            animation: "glow 8s infinite alternate", // Glow animation
          }}
        ></div>
      )}
    </div>
  );
};

export default EmailGuardAnimation;