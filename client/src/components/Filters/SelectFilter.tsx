import React from 'react';
import { AccountProps } from '../../types';

interface RowProps {
  allCells: Array<any>;
  cells: Array<any>;
  depth: number;
  getRowProps: Function;
  id: string;
  index: number
  original: Array<AccountProps>;
  originalSubRows: [];
  values: AccountProps
}

const SelectFilter: React.FC<any> = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = React.useMemo(() => {
    const options = new Set<any>();
    preFilteredRows.forEach((row: RowProps) => {
      // @ts-ignore
      options.add(row.values[id])
    })
    // @ts-ignore
    return [...options.values()] 
  }, [id, preFilteredRows])

  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default SelectFilter;
