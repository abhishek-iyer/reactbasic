import React, { useState, useEffect, useRef } from "react";

const CustomSelect = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const selectRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select" ref={selectRef}>
      <div className="select-header" onClick={toggleDropdown}>
        <div className="selected-option">
          {selectedOption ? selectedOption.label : "Select an option"}
        </div>
        <div className={`dropdown-icon ${isOpen ? "open" : ""}`}>▼</div>
      </div>
      {isOpen && (
        <ul className="options">
          {options.map((option) => (
            <li
              key={option.value}
              className={`option ${
                option === selectedOption ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
