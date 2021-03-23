import React from 'react';
import {ChildInterface} from '../../types';

const TableBody = ({children}: ChildInterface) => {
  return (
    <tbody>{children}</tbody>
  )
}

export default TableBody;
