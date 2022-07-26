import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, handlePageClick }) => {
  return (
    <>
      <ReactPaginate
        previousLabel={"Previous"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        nextLabel={"Next"}
        onPageChange={handlePageClick}
        containerClassName={"pagination pagination-sm justify-content-end"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        breakLabel={"..."}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"active"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
      />
    </>
  );
};

export default Pagination;
