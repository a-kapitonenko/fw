import * as React from 'react';
import TextField from '@material-ui/core/TextField';

import * as orderActions from '../store/order/actions';
import { IOrderState } from '../store/order/types';

import { PrescriptionFields } from '../constants/prescription';

type ComponentProps = {
  order: IOrderState;
  readOnly: boolean;
  handleChange: typeof orderActions.setRxInformation;
};

const PrescriptionSelection: React.SFC<ComponentProps> = ({ order, readOnly, handleChange }) => {
  return (
    <section className="order-selection__section">
      <h2 className="order-selection__section-tittle">Input Rx Information</h2>
      <div>
        {PrescriptionFields.map((element, index) => (
          <TextField
            key={index}
            className="information__text"
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: readOnly }}
            variant="outlined"
            label={`OD ${element.label}`}
            value={order.prescription.OD[element.id]}
            onChange={(evt) => handleChange('OD', element.id, evt.target.value)}
          />
        ))}
      </div>
      <div>
        {PrescriptionFields.map((element, index) => (
          <TextField
            key={index}
            className="information__text"
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: readOnly }}
            variant="outlined"
            label={`OS ${element.label}`}
            value={order.prescription.OS[element.id]}
            onChange={(evt) => handleChange('OS', element.id, evt.target.value)}
          />
        ))}
      </div>
    </section>
  )
};

export default PrescriptionSelection;
