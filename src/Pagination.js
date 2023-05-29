import React from "react";

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li key={number}>
          <button
            className={currentPage === number ? "active" : ""}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
