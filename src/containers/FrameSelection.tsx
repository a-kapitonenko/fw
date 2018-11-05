import * as React from 'react';
// import TextField from '@material-ui/core/TextField';
// import { Input } from 'semantic-ui-react'

import Menu from '../components/Menu';

import '../styles/frameSelection.css'

export interface Props {
  name?: string;
  enthusiasmLevel?: number;
}

class FrameSelection extends React.Component {
  state = {
    open: false,
    anchor: null,
  }

  handleChange = (e: React.SyntheticEvent) => {
    // const element = e.target as HTMLInputElement;
    
    console.log(this.state.open);
  }

  handleClick = (e: React.SyntheticEvent) => {
    this.setState({open: !this.state.open, anchor: e.target});
  }

  render() { 
    return (
      <div className="page__wrapper yellow-section">
        <div className="main-content">
          <h1 className="page__title">Tailored Frame Selection</h1>
            <section className="frame-selection__form">
              <h2 className="frame-selection__form-title">Please enter up to five frame UPC's to check for compatibility and select the one that best suits the patient</h2>
              <input className="frame-selection__form-input" onChange={this.handleChange} type="text" onClick={this.handleClick}/>
            </section>

            <Menu open={this.state.open} anchorEl={this.state.anchor}/>
        </div>
      </div>
    );
  }
}

export default FrameSelection;
