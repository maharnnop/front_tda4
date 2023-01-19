import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { redirect, useNavigate, Link } from "react-router-dom";

// import {
//   NavBar,
//   NavLogo,
//   NavMenu,
//   NavList,
//   NavLink,
//   Bars,
//   ImgLogo,
// } from "../StylesPages/NavBarStyles";

function Nav() {
  const navigate = useNavigate();
  const [showToggle, setShowToggle] = useState(false);
  const handleLogOut = (e) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
  };
//   const admin = (
//     <NavList>
//       <NavLink to="/admin">Admin</NavLink>
//     </NavList>
//   );

  if (localStorage.getItem("jwt") !== null) {
    const decoded = jwt_decode(localStorage.getItem("jwt"));
    const username = localStorage.getItem('username')
    return (
      <div>
      <Link to="/">
        <img
          style={{ height: "70px" }}
          src="https://drive.google.com/uc?id=1C_LXEXZfAW3s7UwHXST5GZu8iEJX0zAf&authuser=0"
        />
      </Link>
      <div className="Nav-menu" showToggle={showToggle}>
      <div className="nav-list">
          <h2>Username : {username}</h2>
        </div>
        <div className="nav-list">
          <Link to="/">Packages</Link>
        </div>
        <div className="nav-list">
          <Link to="/invest">Invest</Link>
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
    
      <div>
        <Link to="/">
          <img
            style={{ height: "70px" }}
            src="https://drive.google.com/uc?id=1C_LXEXZfAW3s7UwHXST5GZu8iEJX0zAf&authuser=0"
          />
        </Link>
        <div className="Nav-menu" showToggle={showToggle}>
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
