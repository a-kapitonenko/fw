export function isNumber(value: any): boolean {
  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    return false;
  }

  return true;
};

export function isEmptyObject(obj: Object): boolean {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  
  return true;
};
