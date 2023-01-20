import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { redirect, useNavigate, Link } from "react-router-dom";
import './Nav.css'
function Nav() {
  const navigate = useNavigate();
  const [showToggle, setShowToggle] = useState(false);
  const handleLogOut = (e) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
  };
  if (localStorage.getItem("jwt") !== null) {
    const decoded = jwt_decode(localStorage.getItem("jwt"));
    const username = localStorage.getItem('username')
    return (
      <div className="header">
      <Link to="/">
        <img
          style={{ height: "70px" }}
          src="https://media.istockphoto.com/id/613873370/vector/family-insurance-icon-flat-design.jpg?s=612x612&w=0&k=20&c=LUU3l6vSJbhEYPEJUVJpvl2MO4k_UQyCw1eTYthcIl8="
        />
      </Link>
            <h3 className="username"><span>User :</span> {username}</h3>
      <div className="nav-menu" showToggle={showToggle}>
          <div className="nav-list">
            <Link to="/">Packages</Link>
          </div>
          <div className="nav-list">
            <Link to="/invest">Invest</Link>
          </div><div className="nav-list">
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div className="nav-list">
            <Link to="/profile">Profile</Link>
          </div>
          <div className="nav-list">
            <Link to="/"><button onClick={handleLogOut}>Logout</button></Link>
          </div>
      </div>
    </div>
    );
  }
  return (
    
      <div className="header">
        <Link to="/">
          <img
            style={{ height: "70px" }}
            src="https://media.istockphoto.com/id/613873370/vector/family-insurance-icon-flat-design.jpg?s=612x612&w=0&k=20&c=LUU3l6vSJbhEYPEJUVJpvl2MO4k_UQyCw1eTYthcIl8="
          />
        </Link>
        <div className="nav-menu" showToggle={showToggle}>
          <div className="nav-list">
            <Link to="/">Packages</Link>
          </div>
          <div className="nav-list">
            <Link to="/signup">Sign Up</Link>
          </div>
          <div className="nav-list">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    
  );
}

export default Nav;
