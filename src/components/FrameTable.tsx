import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Frame, SelectedFrame } from '../store/frames/types';

import { frameTableConfig } from '../constants/frameTable';

type ComponentProps = {
  list: Frame[];
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

  protected renderBodyRows(item: any) {
    return (
      <React.Fragment>
        <TableCell>{item.upc}</TableCell>
        <TableCell>{item.label}</TableCell>
        <TableCell><img className="frame-selection__table-img" src={`/${item.img}`} /></TableCell>
      </React.Fragment>
    );
  }

  render() {
    const { list, selectedFrame, handleClick } = this.props;
    const emptyRows = frameTableConfig.rowsPerPage - list.length;

    return (
      <Paper className="frame-selection__table">
      <Table>
        <TableHead>
          <TableRow>
            {this.renderHeader()}
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item: SelectedFrame) => {
            return (
              <TableRow
                key={item.upc}
                className={`frame-selection__table-row ${selectedFrame === item ? 'row-selected' : ''}`}
                onClick={() => handleClick(item)}
              >
                {this.renderBodyRows(item)}
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
