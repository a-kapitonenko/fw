import { fields } from '../constants/InputInformation';
import { OrderState } from '../store/order/types';

export default function (values: any) {
  const errors = {
    'OrderState': <OrderState>{}
  };
  console.log(errors);

  console.log(values.OrderState);

  if (values.OrderState && values.OrderState.OD) {
    fields.forEach((field) => {
      if (!values.OrderState.OD[field]) {
        errors.OrderState.prescription.OD[field]= 'Required';
      }
    });
  }

  if (values.OrderState && values.OrderState.OS) {
    fields.forEach((field) => {
      if (!values.OrderState.prescription.OS[field]) {
        errors.OrderState.prescription.OS[field] = 'Required';
      }
    });
  }

  return errors;
};
