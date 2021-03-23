import React from 'react';

interface PaginationProps {
  gotoPage: Function;
  previousPage: Function;
  nextPage: Function;
  pageCount: number;
  pageSize: number;
  setPageSize: Function;
  canNextPage: Boolean;
  canPreviousPage: Boolean;
}

const Pagination: React.FC<PaginationProps> = ({ gotoPage, previousPage, nextPage, pageCount, canNextPage, canPreviousPage , pageSize, setPageSize}) => {
  return (
    <div>
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {'<<'}
      </button>{' '}
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </button>{' '}
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </button>{' '}
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
      </button>{' '}
      <select
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Pagination;
