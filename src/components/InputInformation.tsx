import React from 'react';
// import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { InputInformationFields } from '../constants/InputInformation';

interface AllProps {
}

const InputInformation = ({}: AllProps) => (
  <div className="frame-selection__table">
    {InputInformationFields.map((element, index) => (
      <TextField
        className="information__text"
        key={index}
        id="outlined-name"
        label={`OD ${element.label}`}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
    ))}
  </div>
);

export default InputInformation;
