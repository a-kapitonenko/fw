import { InputInformationFields } from '../constants/InputInformation';

export const isNumber = (value) => {
  console.log(value);
  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    return false;
  }

  return true;
};

export const checkPrescriptionFilling = (prescription) => {
  for (const a in prescription) {
    for (const b in prescription[a]) {
      if (prescription[a][b].length === 0) {
        return false;
      }
    }
  }

  return true;
};

export const isEmptyObject = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
};