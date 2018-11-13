export const isNumber = (value) => {
  console.log(value);
  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    return false;
  }

  return true;
};