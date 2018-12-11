export const saveOrder = (state) => {
  return {
    success: true,
  };
};

export const savePrescription = (values) => {
  return {
    success: true,
  };
};

export const saveFittingHeight = (boss, fittingHeight) => {
  return {
    success: true,
    result: {
      img: 'blueprint.png'
    }
  };
};

export const saveOrderInformation = (boss) => {
  return {
    success: true,
    result: {
      img: 'barcode.png'
    }
  };
};
