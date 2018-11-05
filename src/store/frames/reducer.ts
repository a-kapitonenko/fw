// import { EnthusiasmAction } from './actions';
// import { StoreState } from '../interface';
// import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from './types';

// export interface initialState {
//   open: boolean,
// }

// const initialState: initialState = {
//   open: false,
// }

// export function enthusiasm(state: StoreState, action: EnthusiasmAction): StoreState {
//   switch (action.type) {
//     case INCREMENT_ENTHUSIASM:
//       return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
//     case DECREMENT_ENTHUSIASM:
//       return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
//   }
//   return state;
// }