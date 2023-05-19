import React, { useState } from "react";
import Pagination from "./Pagination";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const data = [
    { name: "Rahul", age: 25, email: "abhishek@gmail.com" },
    { name: "Amit", age: 30, email: "deepak@gmail.com" },
    { name: "Sandeep", age: 35, email: "sathish@gmail.com" },
    { name: "sri", age: 25, email: "sri@gmail.com" },
    { name: "shankar", age: 30, email: "shankar@gmail.com" },
    { name: "naani", age: 35, email: "naani@gmail.com" },
    { name: "ganesh", age: 35, email: "ganesh@gmail.com" },
    { name: "vikas", age: 35, email: "vikas@gmail.com" },
    // ...rest of the data
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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

export default Table;
