import React from 'react';
import TextField from '@material-ui/core/TextField';

import { InputInformationFields } from '../constants/InputInformation';

interface AllProps {
  handleRxInformation: any,
}

const InputInformation = ({ handleRxInformation }: AllProps) => (
  <React.Fragment>
    {InputInformationFields.map((element, index) => (
      <TextField
        className="information__text"
        key={index}
        label={`OD ${element.label}`}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) => {
          return handleRxInformation('OD', element.id, event.target.value);
        }}
      />
    ))}

    {InputInformationFields.map((element, index) => (
      <TextField
        className="information__text"
        key={index}
        label={`OS ${element.label}`}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) => {
          return handleRxInformation('OS', element.id, event.target.value);
        }}
      />
    ))}
  </React.Fragment>
);

export default InputInformation;