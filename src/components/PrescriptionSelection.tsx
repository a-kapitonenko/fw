import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import * as orderActions from '../store/order/actions';
import { Prescription } from '../store/order/types';
import { PrescriptionFields } from '../constants/prescription';
import Section from './Section';
import '../styles/prescription.css';

type ComponentProps = {
  prescription: Prescription;
  readOnly: boolean;
  disabled?: boolean;
  handleChange?: typeof orderActions.setRxInformation;
};

const PrescriptionSelection: React.SFC<ComponentProps> = ({ prescription, readOnly, disabled, handleChange }) => {
  return (
    <Section tittle="Input Rx Information" wrap>
      <div className="prescription">
        <div className="prescription__content">
          {PrescriptionFields.map((element, index) => (
            <TextField
              key={index}
              className="prescription__text-field"
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
              className="prescription__text-field"
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
    </Section>
  );
};

export default PrescriptionSelection;
