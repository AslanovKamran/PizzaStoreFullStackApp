import React from 'react'

import ReactPaginate from 'react-paginate';
import styles from "./Pagination.module.scss"

interface IPaginationProps {
  onPageChange: (page: number) => void,
  currentPage: number,
  pageCount: number,
  itemsPerPage: number
}

const Pagination: React.FC<IPaginationProps> = ({ onPageChange, currentPage, pageCount, itemsPerPage }) => {
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