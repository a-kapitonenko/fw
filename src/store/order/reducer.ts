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
  redirect: false,
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

export const saveSuccess = (state: any, type?: any, data?: any) => {
  const object = {};

  if (type) {
    object[type] = data;
  }

  return { ...state, isFetching: false, ...object };
};

export const saveFailed = (state: any, payload: any, errorType: ErrorTypes) => ({
  ...state,
  isFetching: false,
  errors: { ...state.errors, [errorType]: payload },
});

const reducer: Reducer<IOrderState> = (state = initialState, action) => {
  switch (action.type) {
    case OrderActionTypes.SUBMIT_START: {
      return saveStart(state, ErrorTypes.SUBMIT);
    }
    case OrderActionTypes.SUBMIT_SUCCESS: {
      return saveSuccess(state, 'redirect', true);
    }
    case OrderActionTypes.SUBMIT_FAILED: {
      return saveFailed(state, action.payload, ErrorTypes.SUBMIT);
    }
    case OrderActionTypes.SAVE_ORDER_START: {
      return saveStart(state, ErrorTypes.SUBMIT);
    }
    case OrderActionTypes.SAVE_ORDER_SUCCESS: {
      return saveSuccess(state);
    }
    case OrderActionTypes.SAVE_ORDER_FAILED: {
      return saveFailed(state, action.payload, ErrorTypes.SUBMIT);
    }

    case OrderActionTypes.FETCH_ORDER_VALUES_START: {
      return saveStart(state, ErrorTypes.SUBMIT);
    }
    case OrderActionTypes.FETCH_ORDER_VALUES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        recommendation: action.payload.recommendation,
        message: action.payload.message,
        blueprint: action.payload.blueprint,
        fittingProperties: action.payload.fittingProperties,
        boss: {
          ...state.boss,
          prescription: action.payload.prescription,
          lens: action.payload.selectedLens,
          frame: action.payload.selectedFrame,
        },
      };
    }
    case OrderActionTypes.FETCH_ORDER_VALUES_FAILED: {
      return saveFailed(state, action.payload, ErrorTypes.SUBMIT);
    }
    case OrderActionTypes.SAVE_PRESCRIPTION_START: {
      return saveStart(state, ErrorTypes.PRESCRIPTION);
    }
    case OrderActionTypes.SAVE_PRESCRIPTION_SUCCESS: {
      return saveSuccess(state);
    }
    case OrderActionTypes.SAVE_PRESCRIPTION_FAILED: {
      return saveFailed(state, action.payload, ErrorTypes.PRESCRIPTION);
    }
    case OrderActionTypes.SAVE_PRESCRIPTION_CLEAR: {
      return {
        ...state,
        isFetching: false,
        errors: { ...state.errors, prescription: '' },
      };
    }
    case OrderActionTypes.SAVE_FITTING_HEIGHT_START: {
      return saveStart(state, ErrorTypes.FITTING_HEIGHT);
    }
    case OrderActionTypes.SAVE_FITTING_HEIGHT_SUCCESS: {
      return saveSuccess(state, 'blueprint', action.payload);
    }
    case OrderActionTypes.SAVE_FITTING_HEIGHT_FAILED: {
      return saveFailed(state, action.payload, ErrorTypes.FITTING_HEIGHT);
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
            },
          },
        },
      };
    }
    case OrderActionTypes.SET_RECOMMENDATION: {
      return {
        ...state,
        recommendation: action.payload
      };
    }
    case OrderActionTypes.SET_MESSAGE: {
      return {
        ...state,
        message: action.payload
      };
    }
    case OrderActionTypes.SET_FITTING_PROPERTIES: {
      return {
        ...state,
        fittingProperties: action.payload
      };
    }
    case OrderActionTypes.SET_BOSS: {
      return {
        ...state, 
        boss: {
          ...state.boss,
          [action.payload.type]: action.payload.value
        },
      };
    }
    case OrderActionTypes.DISABLE_REDIRECT: {
      return {
        ...state,
        redirect: false
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as OrderReducer };
