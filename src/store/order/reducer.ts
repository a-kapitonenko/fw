import { Reducer } from 'redux';
import { IOrderState, OrderActionTypes, Boss, Prescription, OculusInfo, Blueprint, Barcode } from './types';
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
  isFetching: false,
  boss: <Boss>{
    prescription: <Prescription>{
      OD: initialOculusState,
      OS: initialOculusState
    },
    fittingHeight: 0,
    frame: <Frame>{},
    lens: <Lens>{},
    barcode: <Barcode>{},
  },
  fittingProperties: [],
  recommendation: '',
  message: '',
  blueprint: <Blueprint>{},
  errors: {},
};

const reducer: Reducer<IOrderState> = (state = initialState, action) => {
  switch (action.type) {
    case OrderActionTypes.FETCH_REQUEST: {
      return { ...state, isFetching: true };
    }
    case OrderActionTypes.CLOSE_REQUEST: {
      return { ...state, isFetching: false };
    }
    case OrderActionTypes.SET_ERRORS: {
      return { ...state, errors: { ...state.errors, [action.payload.type]: action.payload.error }};
    }
    case OrderActionTypes.CLEAR_ERRORS: {
      const errors = { ...state.errors };
      
      delete(errors[action.payload]);

      return { ...state, errors }
    }
    case OrderActionTypes.SET_BOSS: {
      return { ...state, boss: { ...state.boss, [action.payload.type]: action.payload.value } }
    }
    case OrderActionTypes.SET_RX_INFORMATION: {
      return {
        ...state,
        boss: {
          ...state.boss,
          prescription: {
            ...state.boss.prescription,
            [action.payload.type]: {
              ...state.boss.prescription[action.payload.type],
              [action.payload.field]: action.payload.value
            }
          }
        }
      };
    }
    case OrderActionTypes.SET_RECOMMENDATION: {
      return { ...state, recommendation: action.payload };
    }
    case OrderActionTypes.SET_MESSAGE: {
      return { ...state, message: action.payload };
    }
    case OrderActionTypes.SET_FITTING_PROPERTIES: {
      return { ...state, fittingProperties: action.payload };
    }
    case OrderActionTypes.SET_BLUEPRINT: {
      return { ...state, blueprint: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as OrderReducer };
