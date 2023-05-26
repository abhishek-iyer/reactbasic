import React, { useState, useEffect, useRef } from "react";

const NavigationMenu = () => {
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  const aboutDropdownRef = useRef(null);

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (
      aboutDropdownRef.current &&
      !aboutDropdownRef.current.contains(event.target)
    ) {
      setIsAboutDropdownOpen(false);
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
        <img src="../images/logo.jpg" alt="Logo" />
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
    </div>
  );
};

export default NavigationMenu;
