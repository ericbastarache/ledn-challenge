import React from 'react';
import { ChildInterface } from '../../types';
const TableHeader = ({children}: ChildInterface) => {
  return (
    <thead>{children}</thead>
  )
}

export default TableHeader;
