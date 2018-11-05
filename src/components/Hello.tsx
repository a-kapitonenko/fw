import * as React from 'react';
// import TextField from '@material-ui/core/TextField';
// import { Input } from 'semantic-ui-react'

import '../styles/frameSelection.css'

export interface Props {
  open?: boolean,
  anchor?: any
}

class DataList extends React.Component<Props> {
  render() {
    const { open }: any = this.props;
    let style = {};

    if (this.props.anchor !== null) {
      const el = this.props.anchor.getBoundingClientRect();

      style = {
        display: 'block',
        position: 'absolute',
        top: el.top + el.height,
        left: el.left,
        width: el.width
      }
    }

    return (
      <div className="page__wrapper yellow-section" style={open ? { ...style } : { display: 'none' }}>
        <h1 className="page__title">Tailored Frame Selection</h1>
      </div>
    );
  }
}

export default DataList;
