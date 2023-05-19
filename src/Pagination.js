import React from "react";

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

export default Pagination;
