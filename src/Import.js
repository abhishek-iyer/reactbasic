import React, { useState } from "react";
import "./import.css";

const Import = () => {
  const [users, setUsers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    setUsers(data.users);
    setShowTable(true);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Users"
          className="search-input"
        />
        <button onClick={fetchData} className="import-button">
          Import
        </button>
      </div>
      {showTable && (
        <UserTable
          users={currentItems}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

const UserTable = ({ users, currentPage, totalPages, handlePageChange }) => {
  return (
    <>
      <div className="pagination-wrapper">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? "active" : ""}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
      <div className="table-container">
        <table className="import-table">
          <thead>
            <tr>
              {Object.keys(users[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                {Object.values(user).map((value, index) => (
                  <td key={index}>
                    {typeof value === "object" && !Array.isArray(value) ? (
                      <>
                        {Object.values(value).map(
                          (nestedValue, nestedIndex) => (
                            <span key={nestedIndex}>
                              {typeof nestedValue === "object"
                                ? Object.values(nestedValue).join(", ")
                                : nestedValue}
                            </span>
                          )
                        )}
                      </>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Import;
