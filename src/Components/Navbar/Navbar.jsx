import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  // Get user name from session storage
  const email = sessionStorage.getItem("email");
  const userName = email ? email.split("@")[0] : null;

  const handleClick = () => {
    const navLinks = document.querySelector(".nav__links");
    const navIcon = document.querySelector(".nav__icon i");

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
      navIcon.classList.remove("fa-bars");
      navIcon.classList.add("fa-times");
    } else {
      navIcon.classList.remove("fa-times");
      navIcon.classList.add("fa-bars");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("email");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy
          <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{fill:"#3685fb"}}>
            <title>Doctor With Stethoscope SVG icon</title>
            <g>
              <g>
                <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
                <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
                <path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7c-22-12.8-35.6-38.5-30.3-66.7c4.7-25.1,25.5-45.6,50.8-49.9c39.7-6.7,74.1,23.7,74.1,62.1c0,23-12.3,43-30.7,54.1c4.7,45.4,45.1,80.4,92.6,76c44.6-4,77.2-44,77.2-88.8V583.9C377,568.7,306.8,489.8,306.1,395H693.2z"></path>
                <path d="M791.6,662.9c-43.7,0-79.2,35.5-79.2,79.2s35.5,79.2,79.2,79.2s79.2-35.5,79.2-79.2S835.3,662.9,791.6,662.9z M791.6,790c-26.4,0-47.9-21.4-47.9-47.9c0-26.4,21.4-47.9,47.9-47.9s47.9,21.4,47.9,47.9C839.5,768.6,818,790,791.6,790z"></path>
                <path d="M930,543.3c-0.2-0.4-19.9-39.4-62.2-39.4c-19.1,0-36.9,8-53,23.9v-0.3c0-59.4-48.3-107.8-107.8-107.8c-59.4,0-107.8,48.3-107.8,107.8v152.4c0,8.6,7,15.6,15.6,15.6c8.6,0,15.6-7,15.6-15.6V527.5c0-42.3,34.4-76.6,76.6-76.6c42.2,0,76.6,34.4,76.6,76.6v19.6c-16.3,15.9-24,33.8-23,53.3c2.2,43.3,42,76.7,42,76.7v136.3c0,75.1-57.7,139.4-132.7,143.6c-78.7,4.4-144.2-57.9-144.2-135.6v-29.3c57.5-7.5,101.9-57,101.9-116.5c0-64.8-52.7-117.5-117.5-117.5S392.8,611.6,392.8,676.4c0,59.5,44.4,109,101.9,116.5v29.3c0,97.9,77.1,180.8,174.9,183c101.6,2.3,185.1-79.7,185.1-180.8V677.1c14.7-16.4,37.4-52.4,35.5-91c-0.5-9.6-2.8-18.6-6.5-27c17.2-20.4,31.1-28.7,43.5-28.7c23.1,0,36.3,25.5,36.4,25.8c3.8,7.7,13.1,10.8,20.8,7.1C991,559.4,993.9,551,930,543.3z M494.7,761.7c-47.2,0-85.6-38.4-85.6-85.6s38.4-85.6,85.6-85.6s85.6,38.4,85.6,85.6S541.9,761.7,494.7,761.7z"></path>
              </g>
            </g>
          </svg>
        </Link>
        <span>.</span>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className="fa fa-times fa fa-bars"></i>
      </div>
      <ul className="nav__links active">
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/booking-consultation">Appointments</Link>
        </li>
        {userName ? (
          <>
            <li className="link welcome-user">
              <span style={{ color: '#3685fb', fontWeight: '600', cursor: 'pointer' }}>
                {userName} ▾
              </span>
              <ul className="dropdown-menu">
                <li><Link to="/profile">My Profile</Link></li>
                <li><Link to="/review">My Reviews</Link></li>
              </ul>
            </li>
            <li className="link">
              <button className="btn1" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
