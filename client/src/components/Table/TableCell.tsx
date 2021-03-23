import React from 'react';
import {ChildInterface} from '../../types';
const TableCell = ({children}: ChildInterface) => {
  return (
    <td>{children}</td>
  )
}

export default TableCell;
