import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Frame } from '../store/frames/types';
import * as framesActions from '../store/frames/actions';

import { frameTableConfig } from '../constants/frameTable';

interface AllProps {
  list: Frame[];
  selectedFrame: Frame; 
  handleClick: typeof framesActions.setSelectedFrame;
}

const FrameTable = ({ list, selectedFrame, handleClick }: AllProps) => {
  const emptyRows = frameTableConfig.rowsPerPage - list.length;

  return (
    <Paper className="frame-selection__table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>UPC Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Picture</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item: Frame) => {
            return (
              <TableRow 
                className={`frame-selection__table-row ${selectedFrame === item ? 'row-selected' : ''}`} 
                key={item.upc} 
                onClick={() => handleClick(item)}
              >
                <TableCell>{item.upc}</TableCell>
                <TableCell>{item.label}</TableCell>
                <TableCell><img className="frame-selection__table-img" src={`/${item.img}`} /></TableCell>
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow style={{ height: frameTableConfig.rowHeight * emptyRows }} />
          )}
        </TableBody>
      </Table>
    </Paper>
  )
};

export default FrameTable;
