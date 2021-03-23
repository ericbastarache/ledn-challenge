import React from 'react';
import { AccountProps } from '../../types';
interface DefaultColumnFilterProps {
  column: {
    filterValue: string;
    preFilteredRows: Array<AccountProps>;
    setFilter: Function;
  }
}
const DefaultColumnFilter: React.FC<DefaultColumnFilterProps> = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

export default DefaultColumnFilter;
