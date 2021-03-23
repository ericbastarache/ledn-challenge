import React from 'react';
import { ChildInterface } from '../../types';
const TableRow = ({children}: ChildInterface) => {
  return (
    <tr>{children}</tr>
  )
}

export default TableRow;

