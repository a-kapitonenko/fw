import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Frame } from '../store/frames/types';

import { frameTableConfig } from '../constants/frameTable';

export type ComponentProps = {
  frames: Frame[];
  selectedFrame: Frame; 
  handleClick: any;
};

class TestTable extends React.Component<ComponentProps> {
  protected renderHeader() {
    return (
      <React.Fragment>
        <TableCell>UPC Code</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Picture</TableCell>
      </React.Fragment>
    );
  }

  protected renderBodyRows(frame: Frame) {
    return (
      <React.Fragment>
        <TableCell>{frame.upc}</TableCell>
        <TableCell>{frame.label}</TableCell>
        <TableCell><img className="frame-selection__table-img" src={`/${frame.img}`} /></TableCell>
      </React.Fragment>
    );
  }

  public render() {
    const { frames, selectedFrame, handleClick } = this.props;
    const emptyRows = frameTableConfig.rowsPerPage - frames.length;

    return (
      <Paper className="frame-selection__table">
      <Table>
        <TableHead>
          <TableRow>
            {this.renderHeader()}
          </TableRow>
        </TableHead>
        <TableBody>
          {frames.map((frame: Frame) => {
            return (
              <TableRow
                key={frame.upc}
                className={`frame-selection__table-row ${selectedFrame === frame ? 'row-selected' : ''}`}
                onClick={() => handleClick(frame)}
              >
                {this.renderBodyRows(frame)}
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow style={{ height: frameTableConfig.rowHeight * emptyRows }} />
          )}
        </TableBody>
      </Table>
    </Paper>
    );
  }
}

export default TestTable;
