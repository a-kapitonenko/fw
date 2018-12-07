const rec = 'Based on the prescription, the lens selection will use an 8 base lenses that is 70 MM in diameter. We recommend you look for frames with a strong front curve and a small Frame ED (<60 ED)';

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

export const saveLens = ({prescription, lens}) => {
  return {
    success: true,
    recommendation: rec
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

export const checkFrameCompatibility = (order) => {
  return {
    success: false,
    result: 'This lens does not accecptable with selected frame.'
  };
};

export const checkLens = (prescription, lens) => {
  return {
    success: true,
    result: ''
  };
};

export const checkLensError = (prescription, lens) => {
  return {
    success: false,
    result: "Selected lens doesn't compatibility with patient prescription. Please, select from the following lenses",
  };
};
