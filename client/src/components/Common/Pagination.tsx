import React, { useState } from 'react'
import ReactPaginate from 'react-js-pagination'
import styled from 'styled-components'

const PaginationWrapper = styled.div`
  font-size: 15px;
  display: flex;
  justify-content: center;
  margin-top: 20px;

  ul {
    display: flex;
    list-style-type: none;
    padding: 0;

    li {
      margin: 0 4px;
      border-radius: 8px;
      a {
        display: inline-block;
        padding: 6px 10px;
        text-decoration: none;
      }

      &.active {
        background-color: var(--color-point);
        a {
          color: var(--color-white);
        }
      }
    }

    li:nth-child(1),
    li:nth-child(2),
    li:nth-child(8),
    li:nth-child(9) {
      background-color: var(--color-point);
      a {
        color: #ffffff;
      }
    }

    li:hover {
      background-color: var(--color-point);
      color: #ffffff;
    }
  }
`

type paginatorProps = {
  totalItemsCount: number
  activePage: number
  onPageChange: (pageNumber: number) => void
}

const PaginationComponent = ({
  totalItemsCount,
  activePage,
  onPageChange,
}: paginatorProps) => {
  return (
    <PaginationWrapper>
      <ReactPaginate
        activePage={activePage}
        itemsCountPerPage={10}
        totalItemsCount={totalItemsCount} // 변수로 변경 예정
        pageRangeDisplayed={5}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={onPageChange}
      />
    </PaginationWrapper>
  )
}

export default PaginationComponent
