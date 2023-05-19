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

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const data = [
    { name: "Rahul", age: 25, email: "abhishek@gmail.com" },
    { name: "Amit", age: 30, email: "deepak@gmail.com" },
    { name: "Sandeep", age: 35, email: "sathish@gmail.com" },
    { name: "Anjali", age: 28, email: "anjali@gmail.com" },
    { name: "Manish", age: 32, email: "manish@gmail.com" },
    { name: "Priya", age: 29, email: "priya@gmail.com" },
    { name: "Saurabh", age: 33, email: "saurabh@gmail.com" },
    { name: "Pooja", age: 27, email: "pooja@gmail.com" },
    { name: "Vivek", age: 31, email: "vivek@gmail.com" },
    { name: "Neha", age: 26, email: "neha@gmail.com" },
    { name: "Rajesh", age: 34, email: "rajesh@gmail.com" },
    { name: "Aarti", age: 28, email: "aarti@gmail.com" },
    { name: "Rohit", age: 32, email: "rohit@gmail.com" },
    { name: "Shweta", age: 29, email: "shweta@gmail.com" },
    { name: "Avinash", age: 33, email: "avinash@gmail.com" },
    { name: "Smita", age: 27, email: "smita@gmail.com" },
    { name: "Alok", age: 31, email: "alok@gmail.com" },
    { name: "Kavita", age: 26, email: "kavita@gmail.com" },
    { name: "Amar", age: 34, email: "amar@gmail.com" },
    { name: "Sneha", age: 28, email: "sneha@gmail.com" },
    { name: "Alok", age: 32, email: "alok2@gmail.com" },
    { name: "Kiran", age: 29, email: "kiran@gmail.com" },
    { name: "Ajay", age: 33, email: "ajay@gmail.com" },
    { name: "Swati", age: 27, email: "swati@gmail.com" },
    { name: "Ashish", age: 31, email: "ashish@gmail.com" },
    { name: "Shilpa", age: 26, email: "shilpa@gmail.com" },
    { name: "Sanjay", age: 34, email: "sanjay@gmail.com" },
    { name: "Kajal", age: 28, email: "kajal@gmail.com" },
    { name: "Avinash", age: 32, email: "avinash2@gmail.com" },
    { name: "Meena", age: 29, email: "meena@gmail.com" },
    { name: "Arun", age: 33, email: "arun@gmail.com" },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table className="main-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={number === currentPage ? "active" : ""}
          onClick={() => paginate(number)}
        >
          {number}
        </li>
      ))}
    </ul>
  );
};

export default function App() {
  return (
    <div className="App">
      <NavigationMenu />
      <Table />
    </div>
  );
}
