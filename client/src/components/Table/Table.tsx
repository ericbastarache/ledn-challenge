import React from 'react';
import { jsx, css } from '@emotion/react';
import Fuse from 'fuse.js';
import { useTable, useFilters, usePagination, useGlobalFilter, useSortBy, useAsyncDebounce, Row, Column } from 'react-table';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableCell from './TableCell';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';
import DefaultColumnFilter from '../Filters/DefaultFilter';
import { AccountProps } from '../../types';

interface TableProps {
  columns: any;
  data: any;
  fetchData: Function;
  pageCount: number;
  loading: boolean;
}

const Table: React.FC<TableProps> = ({ columns, data, fetchData, pageCount: controlledPageCount, loading }) => {
  const defaultColumn = React.useMemo(
    () => ({
        Filter: DefaultColumnFilter,
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable({
    columns, 
    data,
    defaultColumn,
    initialState: { pageIndex: 0 },
    manualPagination: true,
    autoResetPage: false,
    pageCount: controlledPageCount,
  }, useFilters, useGlobalFilter, useSortBy, usePagination);
 
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize]);

  return (
    <>
      <Search
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table {...getTableProps}>
        <TableHeader>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')} <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.map(row => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </table>
      <Pagination
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </>
  )
}

export default Table;
