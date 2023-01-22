import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { redirect, useNavigate, Link } from "react-router-dom";
import './Nav.css'
// hamberger menu
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';

function Nav() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {setSidebar(!sidebar)};

  const navigate = useNavigate();
  
  const handleLogOut = (e) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
  };

  if (localStorage.getItem("jwt") !== null) {
    const decoded = jwt_decode(localStorage.getItem("jwt"));
    const username = localStorage.getItem('username')
    return (
      <>
        <IconContext.Provider value={{ color: 'grey' }}>
        <div className='navbar'>
        <Link className="left-nav" to="/">
        <img
          style={{ height: "70px" }}
          src="https://media.istockphoto.com/id/613873370/vector/family-insurance-icon-flat-design.jpg?s=612x612&w=0&k=20&c=LUU3l6vSJbhEYPEJUVJpvl2MO4k_UQyCw1eTYthcIl8="
        />
            <h3 className="username"><span>User :</span> {username}</h3>
      </Link>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <div className="nav-list">
            
            </div>
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
            <Link to="/" onClick={handleLogOut}>Logout</Link>
          </div>

          </ul>
        </nav>
     
        </IconContext.Provider>
   
      </>
    );
  }
  return (
    <>
    <IconContext.Provider value={{ color: 'grey' }}>
   
    <div className='navbar'>
    <Link className="left-nav" to="/">
    <img
      style={{ height: "70px" }}
      src="https://media.istockphoto.com/id/613873370/vector/family-insurance-icon-flat-design.jpg?s=612x612&w=0&k=20&c=LUU3l6vSJbhEYPEJUVJpvl2MO4k_UQyCw1eTYthcIl8="
    />
    
  </Link>
      <Link to='#' className='menu-bars'>
        <FaIcons.FaBars onClick={showSidebar} />
      </Link>
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
      <ul className='nav-menu-items' onClick={showSidebar}>
        <li className='navbar-toggle'>
          <Link to='#' className='menu-bars'>
            <AiIcons.AiOutlineClose />
          </Link>
        </li>
        <div className="nav-list">
            
          </div>
          <div className="nav-list">
            <Link to="/">Packages</Link>
          </div>
          <div className="nav-list">
            <Link to="/signup">Sign Up</Link>
          </div>
          <div className="nav-list">
            <Link to="/login">Login</Link>
          </div>

      </ul>
    </nav>
 
    </IconContext.Provider>
    </>
  );
}

export default Nav;
