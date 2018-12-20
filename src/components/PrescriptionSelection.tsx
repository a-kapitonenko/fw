import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import * as orderActions from '../store/order/actions';
import { Prescription } from '../store/order/types';
import { PrescriptionFields } from '../constants/prescription';
import Section from './Section';
import '../styles/prescription.css';

type ComponentProps = {
  errors?: string;
  prescription: Prescription;
  readOnly: boolean;
  disabled?: boolean;
  onFocus?: (value: string) => void;
  onChange?: typeof orderActions.setRxInformation;
  onBlur?: (value: string) => void;
};

const PrescriptionSelection: React.SFC<ComponentProps> = ({
  errors,
  prescription,
  readOnly,
  disabled,
  onFocus,
  onChange,
  onBlur,
}) => {
  return (
    <Section tittle="Input Rx Information" wrap>
      {errors && <div className="order-selection__error">{errors}</div>}
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
              onBlur={({ target }) => onBlur ? onBlur(target.value) : {}}
              onChange={({ target }) => onChange ? onChange('OD', element.id, target.value) : {}}
              onFocus={({ target }) => onFocus ? onFocus(target.value) : {}}
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
              onBlur={(evt) => onBlur ? onBlur(evt.target.value) : {}}
              onChange={({ target }) => onChange ? onChange('OS', element.id, target.value) : {}}
              onFocus={(evt) => onFocus ? onFocus(evt.target.value) : {}}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default PrescriptionSelection;
