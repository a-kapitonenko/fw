import { Reducer } from 'redux';
import { IOrderState, OrderActionTypes, Errors, Boss, Prescription, OculusInfo, Blueprint, Barcode, ErrorTypes } from './types';
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
  errors: <Errors>{},
  lenses: [],
  fittingProperties: [],
  recommendation: '',
  message: '',
  blueprint: <Blueprint>{},
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
};

export const saveStart = (state: any, errorTypes: ErrorTypes) => ({
  ...state,
  isFetching: true,
  errors: { ...state.errors, [errorTypes]: '' },
});

export const saveSuccess = (state: any) => ({
  ...state,
  isFetching: false,
});

export const saveFailed = (state: any, payload: any, errorType: ErrorTypes) => ({
  ...state,
  isFetching: false,
  errors: { ...state.errors, [errorType]: payload },
});

const reducer: Reducer<IOrderState> = (state = initialState, action) => {
  switch (action.type) {
    case OrderActionTypes.SUBMIT_START: return saveStart(state, ErrorTypes.SUBMIT);
    case OrderActionTypes.SUBMIT_SUCCESS: return saveSuccess(state);
    case OrderActionTypes.SUBMIT_FAILED: return saveFailed(state, action.payload, ErrorTypes.SUBMIT);

    case OrderActionTypes.SAVE_PRESCRIPTION_START: return saveStart(state, ErrorTypes.PRESCRIPTION);
    case OrderActionTypes.SAVE_PRESCRIPTION_SUCCESS: return saveSuccess(state);
    case OrderActionTypes.SAVE_FITTING_HEIGHT_FAILED: return saveFailed(state, action.payload, ErrorTypes.PRESCRIPTION);

    case OrderActionTypes.FETCH_LENSES_START: return saveStart(state, ErrorTypes.LENSES);
    case OrderActionTypes.FETCH_LENSES_SUCCESS: return saveSuccess(state);
    case OrderActionTypes.FETCH_LENSES_FAILED: return saveFailed(state, action.payload, ErrorTypes.LENSES);

    case OrderActionTypes.SAVE_LENS_START: return saveStart(state, ErrorTypes.LENSES);
    case OrderActionTypes.SAVE_LENS_SUCCESS: return saveSuccess(state);
    case OrderActionTypes.SAVE_LENS_FAILED: return saveFailed(state, action.paylaod, ErrorTypes.LENSES);

    case OrderActionTypes.SAVE_FITTING_HEIGHT_START: return saveStart(state, ErrorTypes.FITTING_HEIGHT);
    case OrderActionTypes.SAVE_FITTING_HEIGHT_SUCCESS: return saveSuccess(state);
    case OrderActionTypes.SAVE_FITTING_HEIGHT_FAILED: return saveFailed(state, action.payload, ErrorTypes.FITTING_HEIGHT);

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
    case OrderActionTypes.SET_BOSS: {
      return { ...state, boss: { ...state.boss, [action.payload.type]: action.payload.value } }
    }
    default: {
      return state;
    }
  }
};

export { reducer as OrderReducer };
