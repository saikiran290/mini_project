import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const OTPVerification = () => {
  const navigate = useNavigate();
  const { email } = useParams(); 
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  // Handle input change
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace and focus on previous field
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOTP = async(otp) =>{
    let user = await axios.get(`/api/confirmOtp/${email}`)
    if(String(user.data.verifyOtp) === String(otp))
    {
      navigate(`/reset/${email}`)
    }
    else{
      alert('incorrect otp')
    }
  }
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join(""); // Convert array to string
    if (enteredOtp.length === 6) {
      console.log(typeof(enteredOtp))
      verifyOTP(enteredOtp)
    } else {
      alert("Please enter a 6-digit OTP.");
    }
  };

  return (
    <div className="container mt-4 text-center">
      <h2>Enter OTP</h2>
      <p>We have sent a 6-digit OTP to your email.</p>
      <form onSubmit={handleSubmit} className="d-flex justify-content-center gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            maxLength="1"
            className="otp-input text-center"
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </form>
      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Verify OTP
      </button>
    </div>
  );
};

export default OTPVerification;
