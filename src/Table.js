import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    priority: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("tableData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("tableData", JSON.stringify(data));
    }
  }, [data, isLoading]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.age - b.age;
    } else {
      return b.age - a.age;
    }
  });
  const filteredData = sortedData.filter((item) => {
    const searchValue = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchValue) ||
      item.email.toLowerCase().includes(searchValue) ||
      item.priority.toLowerCase().includes(searchValue)
    );
  });
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setFormData({
      name: "",
      age: "",
      email: "",
      priority: "",
    });
    setFormErrors({});
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.age) {
      errors.age = "Age is required";
    } else if (!isValidAge(formData.age)) {
      errors.age = "Invalid age format";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.priority) {
      errors.priority = "Priority is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newData = {
      name: formData.name,
      age: parseInt(formData.age),
      email: formData.email,
      priority: formData.priority,
    };
    setData((prevData) => [...prevData, newData]);

    handleCloseModal();

    // Show success notification
    showNotification("Data added successfully!");
  };

  const isValidAge = (age) => {
    return !isNaN(age);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      {notification && <div className="notification">{notification}</div>}
      {isOpen && (
        <div className="modal">
          <div className="background-opacity"></div>

          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {formErrors.name && (
                  <div className="error">{formErrors.name}</div>
                )}
              </div>

              <div className="input-wrapper">
                <label htmlFor="age">Age:</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
                {formErrors.age && (
                  <div className="error">{formErrors.age}</div>
                )}
              </div>

              <div className="input-wrapper">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <div className="error">{formErrors.email}</div>
                )}
              </div>

              <div className="input-wrapper">
                <label htmlFor="priority">Priority:</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {formErrors.priority && (
                  <div className="error">{formErrors.priority}</div>
                )}
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="search-wrapper">
        <button onClick={handleOpenModal} className="add-entry">
          Add Entry
        </button>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search"
        />
      </div>
      <table className="main-table">
        <thead>
          {data.length > 0 && (
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>
                  {key === "age" ? (
                    <button onClick={toggleSortOrder}>
                      {key} {sortOrder === "asc" ? "▲" : "▼"}
                    </button>
                  ) : (
                    key
                  )}
                </th>
              ))}
            </tr>
          )}
        </thead>

        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
              <td>{item.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredData.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Table;
