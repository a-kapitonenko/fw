const checkedFrames = [82850523738, 82850523730];

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

const frames = [
  {
    'upc': '82850523738',
    'name': 'FM17116',
    'img': '1.png' 
  },
  {
    'upc': '82852333738',
    'name': 'FM13416',
    'img': '2.png'
  },
  {
    'upc': '82850223738',
    'name': 'FM17786',
    'img': '3.png'
  },
  {
    'upc': '52850523738',
    'name': 'FN17116',
    'img': '4.png'
  },
  {
    'upc': '82850523730',
    'name': 'FM17110',
    'img': '5.png'
  },
  {
    'upc': '82850511738',
    'name': 'FF17116',
    'img': '6.png'
  },
  { 
    'upc': '82840423738',
    'name': 'RR17116',
    'img': '7.png'
  }
];

const similarFrames = [
  {
    'upc': '81850523738',
    'name': 'FM17116',
    'img': '1.png' 
  },
  {
    'upc': '83852333738',
    'name': 'FM13416',
    'img': '2.png'
  },
  {
    'upc': '84850223738',
    'name': 'FM17786',
    'img': '3.png'
  },
  {
    'upc': '55850523738',
    'name': 'FN17116',
    'img': '4.png'
  },
  {
    'upc': '82850554730',
    'name': 'FM17110',
    'img': '5.png'
  },
  {
    'upc': '82850511668',
    'name': 'FF17116',
    'img': '6.png'
  },
  { 
    'upc': '88940423738',
    'name': 'RR17116',
    'img': '7.png'
  }
];

export const getFrames = (order) => {
  return {
    success: true,
    frames
  };
}

export const getSimilarFrames = (order) => {
  return {
    success: true,
    similarFrames
  };
}

export const checkFrames = (frames) => {
  return frames.map((frame) => {
    const checked = checkedFrames.find(el => el === frame.upc);

    return ({ ...frame, compatibility: checked ? true : false});
  });
};

export const getFramesByUpc = (upc) => {
  const response = newFrames.filter((frame) => {
    return frame.upc.indexOf(upc) === -1 ? false : true;
  });

  return {
    success: true,
    result: response
  }
};
