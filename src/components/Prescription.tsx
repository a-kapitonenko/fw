import * as React from 'react';
import TextField from '@material-ui/core/TextField';

import * as orderActions from '../store/order/actions';
import { OrderState } from '../store/order/types';

import { InputInformationFields } from '../constants/InputInformation';

type ComponentProps = {
  order: OrderState,
  handleChange: typeof orderActions.setRxInformation,
};

const PrescriptionSelection = ({ order, handleChange }: ComponentProps) => (
  <div>
    {InputInformationFields.map((element, index) => (
      <TextField
        key={index}
        className="information__text"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        label={`OD ${element.label}`}
        value={order.prescription.OD[element.id]}
        onChange={(evt) => handleChange('OD', element.id, evt.target.value)}
      />
    ))}

    {InputInformationFields.map((element, index) => (
      <TextField
        key={index}
        className="information__text"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        label={`OS ${element.label}`}
        value={order.prescription.OS[element.id]}
        onChange={(evt) => handleChange('OS', element.id, evt.target.value)}
      />
    ))}
  </div>
);

export default PrescriptionSelection;
