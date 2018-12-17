export const rec = 'Based on the prescription, the lens selection will use an 8 base lenses that is 70 MM in diameter. We recommend you look for frames with a strong front curve and a small Frame ED (<60 ED)';

export const lenses = [
  {
    name: 'Nikon Eyes* Advanced + Polycarbonate- Polarized Gray/Brown',
    value: 1
  },
  {
    name: 'Nikon Eyes* Advanced + Polycarbonate- Transitions* Signature VII',
    value: 2
  },
  {
    name: 'Nikon Eyes* Advanced + Polycarbonate- XTRActive* Gray',
    value: 3
  },
  {
    name: 'Nikon Eyes* Affinity Trivex-Clear',
    value: 4
  },
  {
    name: 'Nikon Eyes* Affinity 1.67- Transitions* Signature VII Gray',
    value: 5
  },
  {
    name: 'Nikon Eyes* Affinity 1.67- Transitions* XTRActive Gray',
    value: 6
  },
  {
    name: 'Nikon Eyes* Customized + 1.67- Clear',
    value: 7
  },
  {
    name: 'Nikon Eyes* Customized* + 1.67- Transitions* Signature VII Gray',
    value: 8
  },
  {
    name: 'Nikon Eyes* Customized* + 1.67- Transitions* XTRActive* Gray',
    value: 9
  },
  {
    name: 'Nikon Eyes* Customized* + 1.67- Polarized Gray',
    value: 10
  },
];

export const saveLens = ({ prescription, lens }) => {
  return {
    success: true,
    recommendation: rec
  };
};

export const getLenses = (boss) => {
  return {
    success: true,
    lenses 
  }
};

export const checkLens = ({ prescription, lens }) => {
  return {
    success: true,
    result: ''
  };
};

export const checkLensError = ({ prescription, lens }) => {
  return {
    success: false,
    error: "Selected lens doesn't compatibility with patient prescription. Please, select from the following lenses",
  };
};

