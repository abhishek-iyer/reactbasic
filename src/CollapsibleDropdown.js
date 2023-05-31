import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const CollapsibleDropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-drop">
      <button onClick={toggleDropdown} className="collapsible-button">
        {props.title}
        {isOpen ? <FaMinus /> : <FaPlus />}
      </button>
      {isOpen && <div className="content">{props.content}</div>}
    </div>
  );
};

export default CollapsibleDropdown;
