export const message = 'The selected parameters for frame and lens are acceptable for cotout.';

let counter = 0;

const checkedFrames = [82850523738, 82850523730];

export const fittingHeight = [
  {
    name: '1',
    value: 1
  },
  {
    name: '2',
    value: 2
  },
  {
    name: '3',
    value: 3
  },
  {
    name: '4',
    value: 4
  },
  {
    name: '5',
    value: 5
  },
];

const newFrames = [
  {
    'upc': '82850523738',
    'label': 'FM17116',
    'value': '82850523738',
    'img': '1.png'
  },
  {
    'upc': '82852333738',
    'label': 'FM13416',
    'value': '82852333738',
    'img': '2.png'
  },
  {
    'upc': '82850223738',
    'label': 'FM17786',
    'value': '82850223738',
    'img': '3.png'
  },
  {
    'upc': '52850523738',
    'label': 'FN17116',
    'value': '52850523738',
    'img': '4.png'
  },
  {
    'upc': '82850523730',
    'label': 'FM17110',
    'value': '82850523730',
    'img': '5.png'
  },
  {
    'upc': '82850511738',
    'label': 'FF17116',
    'value': '82850511738',
    'img': '6.png'
  },
  {
    'upc': '82840423738',
    'label': 'RR17116',
    'value': '82840423738',
    'img': '7.png'
  }
];

const similarFrames = [
  {
    upc: '82850523738',
    label: 'FM17116',
    value: '82850523738',
    img: '1.png',
    compatibility: true
  },
  {
    upc: '82852333738',
    label: 'FM13416',
    value: '82852333738',
    img: '2.png',
    compatibility: true
  },
  {
    'upc': '82850223738',
    'label': 'FM17786',
    'value': '82850223738',
    'img': '3.png',
    compatibility: true
  },
  {
    'upc': '52850523738',
    'label': 'FN17116',
    'value': '52850523738',
    'img': '4.png',
    compatibility: true
  },
  {
    'upc': '82850523730',
    'label': 'FM17110',
    'value': '82850523730',
    'img': '5.png',
    compatibility: true
  },
  {
    'upc': '82850511738',
    'label': 'FF17116',
    'value': '82850511738',
    'img': '6.png',
    compatibility: true
  },
  {
    'upc': '82840423738',
    'label': 'RR17116',
    'value': '82840423738',
    'img': '7.png',
    compatibility: true
  }
];

export const getSimilarFrames = (boss) => {
  return {
    success: true,
    similarFrames
  };
}

export const checkFrames = (frames) => {
  return frames.map((frame) => {
    const checked = checkedFrames.find(el => el === frame.upc);

    return ({ ...frame, compatibility: checked ? true : false });
  });
};

export const getFramesByUpc = ({ boss, upc }) => {
  const response = newFrames.filter((frame) => {
    return frame.upc.indexOf(upc) === -1 ? false : true;
  }).map((frame) => ({ ...frame, compatibility: checkCompatibility() }));

  return {
    success: true,
    result: response
  }
};

export const checkCompatibility = () => {
  if (counter++ % 2 === 0){
    return true;
  }

  return false;
};

export const getFilterGroups = () => {
  return {
    success: true,
    result: {
      color: [
        { name: 'Black', value: 'black' },
        { name: 'Gold', value: 'gold' },
        { name: 'Brown', value: 'brown' },
        { name: 'Red', value: 'red' }
      ],
      width: [
        { name: 'Narrow', value: 'narrow' },
        { name: 'Medium', value: 'medium' },
        { name: 'Wide', value: 'wide' }
      ],
      noseBridge: [
        { name: 'Standard', value: 'standard' },
        { name: 'Low bridge fit', value: 'lowBrigdeFit' }
      ],
      shape: [
        { name: 'Square', value: 'square' },
        { name: 'Rectangle', value: 'rectangle' },
        { name: 'Round', value: 'round' },
        { name: 'Cat-eye', value: 'catEye' }
      ],
      material: [
        { name: 'Acetate', value: 'acetate' },
        { name: 'Metal', value: 'metal' },
        { name: 'Mixed material', value: 'mixedMaterial' }
      ]
    }
  }
};

export const getFilterFrames = ({ boss, query }) => {
  const response = newFrames.map((frame) => ({ ...frame, compatibility: true }));

  return {
    success: true,
    frames: response,
  };
};

export const onSubmit = ({ boss, frame }) => {
  return {
    success: true,
    result: {
      message: message,
      fittingHeight: fittingHeight,
    },
  };
};

export const checkFrameCompatibility = ({ boss }) => {
  return {
    success: false,
    error: 'This lens does not accecptable with selected frame.',
  };
};
