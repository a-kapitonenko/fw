import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';

import { Frame } from '../store/frames/types';

import FrameTable, { ComponentProps } from './FrameTable';

class FrameSearchTable extends FrameTable {
  constructor(props: ComponentProps) {
    super(props);
  }

  protected renderHeader() {
    return ( 
      <React.Fragment>
        {super.renderHeader()}
        <TableCell>Compatibility</TableCell>
      </React.Fragment>
    );
  }

  protected renderBodyRows(frame: Frame) {
    return (
      <React.Fragment>
        {super.renderBodyRows(frame)}
        <TableCell>{frame.compatibility ? 'true' : 'false'}</TableCell>
      </React.Fragment>
    );
  }
}

export default FrameSearchTable;
