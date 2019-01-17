import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Prescription } from '../store/order/types';
import { PrescriptionFields } from '../constants/prescription';
import Section from './Section';
import '../styles/prescription.css';

type ComponentProps = {
  disabled?: boolean;
  errors?: string;
  prescription: Prescription;
  readOnly: boolean;
  onChange?: (type: string, field: string, value: string) => void;
  onSubmit?: () => void;
};

const PrescriptionSelection: React.SFC<ComponentProps> = ({
  disabled,
  errors,
  prescription,
  readOnly,
  onChange,
  onSubmit,
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
              onChange={({ target }) => onChange ? onChange('OD', element.id, target.value) : {}}
            />
          ))}
        </div>
        <div className="prescription__content">
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
              onChange={({ target }) => onChange ? onChange('OS', element.id, target.value) : {}}
            />
          ))}
        </div>
        {!readOnly
          && (
            <Button
              className="page__button"
              variant="contained"
              onClick={onSubmit}
              disabled={disabled}
            >
              Continue
        </Button>
          )
        }
      </div>
    </Section>
  );
};

export default PrescriptionSelection;
