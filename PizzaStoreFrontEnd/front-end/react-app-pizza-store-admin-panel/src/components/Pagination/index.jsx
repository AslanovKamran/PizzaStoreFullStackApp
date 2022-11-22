import React from 'react'

import ReactPaginate from 'react-paginate';
import styles from "./Pagination.module.scss"



function Pagination({ onPageChange, currentPage, pageCount, itemsPerPage }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel="→"
      previousLabel="←"
      onPageChange={(event) => onPageChange(event.selected + 1)} //Тут возвращается index поэтому +1
      pageRangeDisplayed={itemsPerPage}
      pageCount={pageCount}
      forcePage={currentPage - 1} // а сюда нужно передать index поэтому -1
    />
  )
}

export default Pagination