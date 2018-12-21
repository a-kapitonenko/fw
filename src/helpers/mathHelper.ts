export function isEmptyObject(obj: Object): boolean {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  
  return true;
};

export function isNumber(value: any): boolean {
  const isValueNaN = isNaN(parseFloat(value));
  const isValueFinite = isFinite(value);

  if (!isValueNaN && isValueFinite) {
    return true;
  }

  return false;
};
