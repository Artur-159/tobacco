import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import MainButton from "../button/button";
import { setPage } from "../../store/pagination/slice";

import styles from "./styles.module.scss";

const Pagination = ({ offset, total, pageCount = 20 }) => {
  const dispatch = useDispatch();
  const itemsPerPage = pageCount;
  const totalPages = Math.ceil(total / itemsPerPage);
  const currentPage = offset + 1;

  if (total <= pageCount) return null;

  const handlePageChange = (page) => {
    dispatch(setPage(page - 1));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(currentPage - halfMaxPagesToShow, 1);
    let endPage = Math.min(currentPage + halfMaxPagesToShow, totalPages);

    if (startPage === 1) {
      endPage = Math.min(maxPagesToShow, totalPages);
    } else if (endPage === totalPages) {
      startPage = Math.max(totalPages - maxPagesToShow + 1, 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <MainButton
          key={1}
          active={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          1
        </MainButton>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <MainButton
          key={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
          className={`${styles.pagination_btn} ${
            currentPage === i ? styles.active : ""
          }`}
        >
          {i}
        </MainButton>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      }
      pageNumbers.push(
        <MainButton
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={styles.totalPage_btn}
        >
          {totalPages}
        </MainButton>
      );
    }

    return pageNumbers;
  };

  return (
    <Box
      mt={2}
      display="flex"
      alignItems="center"
      className={styles.pagination}
      justifyContent="center"
    >
      <MainButton onClick={handlePreviousPage} disabled={currentPage === 1}>
        &lt;
      </MainButton>
      {renderPageNumbers()}
      <MainButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        &gt;
      </MainButton>
    </Box>
  );
};

export default Pagination;
