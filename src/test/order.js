const rec = 'Based on the prescription, the lens selection will use an 8 base lenses that is 70 MM in diameter. We recommend you look for frames with a strong front curve and a small Frame ED (<60 ED)';

export const savePrescriptionInformation = (values) => {
  return {
    success: true,
    recommendation: rec
  };
};

export const saveFittingHeightInformation = (order, fittingHeight) => {
  return {
    success: true,
    result: {
      img: 'blueprint.png'
    }
  };
};

export const saveOrderInformation = (order) => {
  return {
    success: true,
    result: {
      img: 'barcode.png'
    }
  };
};

export const checkFrameCompatibility = (order) => {
  return {
    success: false,
    result: 'This lens does not accecptable with selected frame.'
  };
};
