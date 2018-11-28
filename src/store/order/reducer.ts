import { Reducer } from 'redux';
import { IOrderState, OrderActionTypes, Prescription, OculusInfo, Blueprint, Barcode } from './types';
import { Frame } from '../frames/types';
import { Lens } from '../lenses/types';

const initialOculusState: OculusInfo = {
  sphere: '',
  cyclinder: '',
  axis: '',
  addition: '',
  PDDistance: '',
  PDNear: '',
  prism: '',
};

const initialState: IOrderState = {
  prescription: <Prescription>{
    OD: initialOculusState,
    OS: initialOculusState
  },
  frame: <Frame>{},
  fittingHeight: 0,
  fittingProperties: [],
  lens: <Lens>{},
  recommendation: '',
  message: '',
  blueprint: <Blueprint>{},
  barcode: <Barcode>{},
  errors: {},
};

const reducer: Reducer<IOrderState> = (state = initialState, action) => {
  switch (action.type) {
    case OrderActionTypes.SET_RX_INFORMATION: {
      return { 
        ...state, 
        prescription: {
          ...state.prescription,
          [action.payload.type]: {
            ...state.prescription[action.payload.type],
            [action.payload.field]: action.payload.value
          }
        }
      };
    }
    case OrderActionTypes.SET_RECOMMENDATION: {
      return { ...state, recommendation: action.payload };
    }
    case OrderActionTypes.SET_LENS: {
      return { ...state, lens: action.payload };
    }
    case OrderActionTypes.SET_FRAME: {
      return { ...state, frame: action.payload };
    }
    case OrderActionTypes.SET_MESSAGE: {
      return { ...state, message: action.payload };
    }
    case OrderActionTypes.SET_FITTING_PROPERTIES: {
      return { ...state, fittingProperties: action.payload };
    }
    case OrderActionTypes.SET_FITTING_HEIGHT: {
      return { ...state, fittingHeight: action.payload };
    }
    case OrderActionTypes.SET_BLUEPRINT: {
      return { ...state, blueprint: action.payload };
    }
    case OrderActionTypes.SET_BARCODE: {
      return { ...state, barcode: action.payload };
    }
    case OrderActionTypes.SET_ERRORS: {
      return { ...state, errors: { ...state.errors, [action.payload.type]: action.payload.error }};
    }
    case OrderActionTypes.DELETE_ERRORS: {
      const errors = { ...state.errors };
      delete(errors[action.payload]);

      return { ...state, errors }
    }
    default: {
      return state
    }
  }
};

export { reducer as OrderReducer };
