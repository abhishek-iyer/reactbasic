import React, { useState } from "react";
import "./import.css";

const Import = () => {
  const [users, setUsers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const fetchData = () => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
        setShowTable(true);
        setSearchQuery("");
        setCurrentPage(1);
      });
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
      <UserTable
        users={currentItems}
        showTable={showTable}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

const UserTable = ({
  users,
  showTable,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  if (!showTable) {
    return null;
  }
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
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Username</th>
              <th>Password</th>
              <th>Birth Date</th>
              <th>Image</th>
              <th>Blood Group</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Eye Color</th>
              <th>Hair Color</th>
              <th>Hair Type</th>
              <th>Domain</th>
              <th>IP</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Postal Code</th>
              <th>Mac Address</th>
              <th>University</th>
              <th>Card Expire</th>
              <th>Card Number</th>
              <th>Card Type</th>
              <th>Currency</th>
              <th>IBAN</th>
              <th>Company Name</th>
              <th>Department</th>
              <th>Job Title</th>
              <th>Company Address</th>
              <th>Company City</th>
              <th>Company State</th>
              <th>Company Postal Code</th>
              <th>EIN</th>
              <th>SSN</th>
              <th>User Agent</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.birthDate}</td>
                <td>
                  <img
                    src={user.image}
                    alt="User"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{user.bloodGroup}</td>
                <td>{user.height}</td>
                <td>{user.weight}</td>
                <td>{user.eyeColor}</td>
                <td>{user.hair.color}</td>
                <td>{user.hair.type}</td>
                <td>{user.domain}</td>
                <td>{user.ip}</td>
                <td>{user.address.address}</td>
                <td>{user.address.city}</td>
                <td>{user.address.state}</td>
                <td>{user.address.postalCode}</td>
                <td>{user.macAddress}</td>
                <td>{user.university}</td>
                <td>{user.bank.cardExpire}</td>
                <td>{user.bank.cardNumber}</td>
                <td>{user.bank.cardType}</td>
                <td>{user.bank.currency}</td>
                <td>{user.bank.iban}</td>
                <td>{user.company.name}</td>
                <td>{user.company.department}</td>
                <td>{user.company.title}</td>
                <td>{user.company.address.address}</td>
                <td>{user.company.address.city}</td>
                <td>{user.company.address.state}</td>
                <td>{user.company.address.postalCode}</td>
                <td>{user.ein}</td>
                <td>{user.ssn}</td>
                <td>{user.userAgent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Import;
