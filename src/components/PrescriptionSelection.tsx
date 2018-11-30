import * as React from 'react';
import TextField from '@material-ui/core/TextField';

import * as orderActions from '../store/order/actions';
import { Prescription } from '../store/order/types';

import { PrescriptionFields } from '../constants/prescription';

type ComponentProps = {
  prescription: Prescription;
  readOnly: boolean;
  disabled?: boolean;
  handleChange?: typeof orderActions.setRxInformation;
};

const PrescriptionSelection: React.SFC<ComponentProps> = ({ prescription, readOnly, disabled, handleChange }) => {
  return (
    <section className="order-selection__section">
      <h2 className="order-selection__section-tittle">Input Rx Information</h2>
      <div>
        <div>
          {PrescriptionFields.map((element, index) => (
            <TextField
              key={index}
              className="information__text"
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: readOnly }}
              disabled={disabled}
              variant="outlined"
              label={`OD ${element.label}`}
              value={prescription.OD[element.id]}
              onChange={(evt) => {
                if (handleChange) {
                  return handleChange('OD', element.id, evt.target.value);
                }

                return;
              }}
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
              disabled={disabled}
              variant="outlined"
              label={`OS ${element.label}`}
              value={prescription.OS[element.id]}
              onChange={(evt) => {
                if (handleChange) {
                  return handleChange('OS', element.id, evt.target.value);
                }

                return
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrescriptionSelection;
