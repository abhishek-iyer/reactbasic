import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const NavigationMenu = () => {
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const aboutDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (
      aboutDropdownRef.current &&
      !aboutDropdownRef.current.contains(event.target)
    ) {
      setIsAboutDropdownOpen(false);
    }

    if (
      userDropdownRef.current &&
      !userDropdownRef.current.contains(event.target) &&
      !event.target.classList.contains("username")
    ) {
      setIsUserDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navigation-menu">
      <div className="logo">
        <img src="/path/to/logo.png" alt="Logo" />
      </div>
      <nav className="nav-menu">
        <ul>
          <li>Home</li>
          <li
            className={`dropdown-parent ${isAboutDropdownOpen ? "open" : ""}`}
            ref={aboutDropdownRef}
          >
            <button className="dropdown-button" onClick={toggleAboutDropdown}>
              About Us
            </button>
            {isAboutDropdownOpen && (
              <ul className="main-dropdown">
                <li>About 1</li>
                <li>About 2</li>
                <li>About 3</li>
              </ul>
            )}
          </li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div className="user-menu">
        <div
          className={`username ${isUserDropdownOpen ? "open" : ""}`}
          onClick={toggleUserDropdown}
          ref={userDropdownRef}
        >
          User Name
        </div>
        {isUserDropdownOpen && (
          <ul className="dropdown">
            <li>Profile</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavigationMenu;
