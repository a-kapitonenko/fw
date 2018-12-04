import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Frame } from '../store/frames/types';

import { frameTableConfig } from '../constants/frameTable';

export type ComponentProps = {
  disabled?: boolean;
  frames: Frame[];
  selectedFrame: Frame;
  handleClick: any;
};

class TestTable extends React.Component<ComponentProps> {
  state = { scrollHeight: 0 };

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

  protected handleScroll = ({target}: any) => {
    this.setState({scrollHeight: target.scrollTop})
  }

  public render() {
    const { disabled, frames, selectedFrame, handleClick } = this.props;
    const { scrollHeight } = this.state;

    const emptyRows = frameTableConfig.rowsPerPage - frames.length;
// 
    return (
      <Paper
        className="frame-selection__table-wrapper"
        style={{ height: 57 + frameTableConfig.rowHeight * frameTableConfig.rowsPerPage }}
        onScroll={this.handleScroll}
      >
      {disabled && <CircularProgress style={{position: 'absolute', top: `calc(50% + ${scrollHeight}px - 24px)`, left: 'calc(50% - 24px)'}} />}
        <div className="frame-selection__table">
        <Table className={disabled ? 'frame-selection__table-opacity' : ''}>
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
                  className={`frame-selection__table-row ${selectedFrame.value === frame.value ? 'row-selected' : ''}`}
                  onClick={() => { 
                    if (!disabled) {
                      handleClick(frame)
                    }
                  }}
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
        </div>
      </Paper>
    );
  }
}

export default TestTable;
