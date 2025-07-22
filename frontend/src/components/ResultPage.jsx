import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get state safely
  const state = location.state || {};
  let result = state.result || { RESULT: "No result available" }; // Default fallback
  const type = state.type || "";

  // Ensure we correctly access the RESULT field
  let resultText =
    typeof result === "object" && result.RESULT ? result.RESULT : JSON.stringify(result);

  // Classification response (Spam or Ham)
  const isSpam = resultText === "Predicted as: spam" ;
  const isHam = resultText === "Predicted as: ham";

  return (
    <div className="container text-center p-5 mt-5">
      <h2>Result</h2>

      {type === "/api/classify" ? (
        <div
          className={`card text-white p-3 mt-3 ${
            isSpam ? "bg-danger" : isHam ? "bg-success" : "bg-secondary"
          }`}
        >
          <h3>{resultText}</h3>
        </div>
      ) : (
        <div className="card p-3 mt-3">
          <h3>Summary</h3>
          <p>{resultText}</p> {/* This will always be a clean string */}
        </div>
      )}

      <button className="btn btn-primary mt-4" onClick={() => navigate("/mail")}>
        Back
      </button>
    </div>
  );
};

export default ResultPage;
