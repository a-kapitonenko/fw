import { InputInformationFields } from '../constants/InputInformation';

export const isNumber = (value) => {
  console.log(value);
  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    return false;
  }

  return true;
};

export const isPrescriptionFilled = (prescription) => {
  for (const a in prescription) {
    for (const b in a) {
      console.log(prescription[a[b]]);
    }
  }
};