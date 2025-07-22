import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Preloader from "./components/Preloader";
import Mail from './components/Mail';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import AllMails from './components/AllMails';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResultPage from './components/ResultPage';
import Logout from './components/Logout';
import ForgotPass from './components/ForgotPass';
import ResetPass from './components/ResetPass';
import Confirmotp from './components/Confirmotp';

function App() {
  const [loading, setLoading] = useState(!sessionStorage.getItem("loaded"));

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("loaded", "true"); // Prevent preloader on re-renders
      }, 4000); // Matches Preloader animation duration
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/mail" element={<Mail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/allmails" element={<AllMails />} />
            <Route path="/logout" element={<Logout />} />
            <Route path='/forgot' element={<ForgotPass />} />
            <Route path='/reset/:email' element={<ResetPass />} />
            <Route path='/otp/:email' element={<Confirmotp />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
