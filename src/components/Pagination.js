import React from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  margin: 1rem auto;
  color: white;
`;

export default function Pagination({
  currentPage,
  totalPage,
  handlePrevPage,
  handleNextPage,
}) {
  return (
    <PaginationContainer>
      <Button variant='contained' onClick={handlePrevPage}>
        Prev
      </Button>
      <span>
        {currentPage}/{totalPage}
      </span>
      <Button variant='contained' onClick={handleNextPage}>
        Next
      </Button>
    </PaginationContainer>
  );
}
