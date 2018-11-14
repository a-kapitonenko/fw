import { Reducer } from 'redux';
import { OrderState, OrderActionTypes, Rx } from './types';
import { Frame } from '../frames/types';
import { Lens } from '../lenses/types';

const initialState: OrderState = {
  prescription: {
    OD: <Rx>{},
    OS: <Rx>{}
  },
  frame: <Frame>{},
  fittingHeight: 0,
  lens: <Lens>{},
  recommendation: '',
};

const reducer: Reducer<OrderState> = (state = initialState, action) => {
  switch (action.type) {
    case OrderActionTypes.SET_RECOMMENDATION: {
      return { ...state, recommendation: action.payload };
    }
    case OrderActionTypes.SET_PRESCRIPTION: {
      return { ...state, prescription: action.payload };
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

export { reducer as OrderReducer }

