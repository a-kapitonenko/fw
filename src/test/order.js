import database from './database';

export const saveOrder = (request) => {
  let user =  database.find(user => user.id === request.id);

  return {
    success: true,
    id: '6E8C896C14153342DE34BBF26F69A8135BA548864A8C838F035CB35A593C2399',
  };
};

export const savePrescription = (values) => {
  return {
    success: true,
    result: '',
  };
};

export const saveFittingHeight = ({ boss, fittingHeight }) => {
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

export const loadOrderValues = (id) => {
  let user =  database.find(user => user.id === id);
  if (user) {
    return {
      success: true,
      values: user.order,
    };
  }

  return {
    success: false,
    error: 'Failed to load order values',
  };
};