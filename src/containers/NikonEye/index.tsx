import * as React from 'react';
import TextField from '@material-ui/core/TextField';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

const Hello = () => (
  <form className="information__form">
    <h5>Input Rx Information</h5>

    <div className="information__content">
      <TextField
        className="information__text"
        id="filled-name"
        label="OD Label"
        margin="normal"
        variant="outlined"
      />

      <TextField
        className="information__text"
        id="filled-name"
        label="OD Cyclinder"
        margin="normal"
        variant="outlined"
      />

      <TextField
        className="information__text"
        id="filled-name"
        label="OD Axis"
        margin="normal"
        variant="outlined"
      />

      <TextField
        className="information__text"
        id="filled-name"
        label="OD Addition"
        margin="normal"
        variant="outlined"
      />

      <TextField
        className="information__text"
        id="filled-name"
        label="OD PD Distance"
        margin="normal"
        variant="outlined"
      />

      <TextField
        className="information__text"
        id="filled-name"
        label="OD PD Near"
        margin="normal"
        variant="outlined"
      />

      <TextField
        className="information__text"
        id="filled-name"
        label="OD Prism"
        margin="normal"
        variant="outlined"
      />
    </div>

    <div className="information__content">
      <TextField
        className="information__text"
        id="filled-name"
        label="OD Label"
        margin="normal"
        variant="outlined"
      />

      <TextField
        className="information__text"
        id="filled-name"
        label="OD Cyclinder"
        margin="normal"
        variant="outlined"
      />

      <TextField
        className="information__text"
        id="filled-name"
        label="OD Axis"
        margin="normal"
        variant="outlined"
      />

      <TextField
        className="information__text"
        id="filled-name"
        label="OD Addition"
        margin="normal"
        variant="outlined"
      />

      <TextField
        className="information__text"
        id="filled-name"
        label="OD PD Distance"
        margin="normal"
        variant="outlined"
      />

      <TextField
        className="information__text"
        id="filled-name"
        label="OD PD Near"
        margin="normal"
        variant="outlined"
      />

      <TextField
        className="information__text"
        id="filled-name"
        label="OD Prism"
        margin="normal"
        variant="outlined"
      />
    </div>
  </form>
);

export default Hello;
