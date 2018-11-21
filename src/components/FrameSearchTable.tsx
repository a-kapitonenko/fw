import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';

import FrameTable from './FrameTable';

class FrameSearchTable extends FrameTable {
  constructor(props: any) {
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

  protected renderBodyRows(item: any) {
    return (
      <React.Fragment>
        {super.renderBodyRows(item)}
        <TableCell>{item.compatibility ? 'true' : 'false'}</TableCell>
      </React.Fragment>
    );
  }
}

export default FrameSearchTable;
