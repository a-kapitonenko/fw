import { fields } from '../constants/InputInformation';
import { FormErrors } from 'redux-form';

export default function (values: any) {
  const errors: FormErrors = {};
  errors['prescription'] = {
    OD: {},
    OS: {}
  };

  fields.forEach((field) => {
    if (!values.prescription || !values.prescription.OD || !values.prescription.OD[field]) {
      errors['prescription'].OD[field]= 'Required';
    }

    if (!values.prescription || !values.prescription.OS || !values.prescription.OS[field]) {
      errors['prescription'].OS[field]= 'Required';
    }
  });

  return errors;
};
