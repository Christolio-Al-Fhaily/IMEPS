// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">ULFG Portal</span>
        <div className="navItems">
          <Link to="/" className="navButton">Home</Link>
          <Link to="/universities" className="navButton">Universities</Link>
          <Link to="/bourses" className="navButton">Scholarships</Link>
        </div>
        <div className="loginButton">
          <Link to="/login" className="navButton">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
