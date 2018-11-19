import { Reducer } from 'redux';
import { IOrderState, OrderActionTypes, Prescription, OculusInfo } from './types';
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
  lens: <Lens>{},
  recommendation: '',
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
    default: {
      return state
    }
  }
};

export { reducer as OrderReducer };
