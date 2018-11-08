import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { SelectedFrame } from '../store/frames/types';

interface AllProps {
  list: SelectedFrame[]
}

const SimpleTable = ({ list }: AllProps) => (
  <Paper className="frame-selection__table">
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>UPC Code</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Picture</TableCell>
          <TableCell>Compatibility</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map((item: SelectedFrame) => {
          return (
            <TableRow key={item.upc}>
              <TableCell>{item.upc}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell><img className="frame-selection__table-img" src={`/${item.img}`} /></TableCell>
              <TableCell>{item.compatibility ? 'true' : 'false'}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </Paper>
);

export default SimpleTable;
