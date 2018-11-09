// import { Dispatch } from 'redux';
// import { action } from 'typesafe-actions';

// import { LensesActionTypes, Lens } from './types';
// import { Order } from '../order/types';

// export const fetchRequest = () => action(LensesActionTypes.FETCH_REQUEST);
// export const fetchSuccess = (list: Lens[]) => action(LensesActionTypes.FETCH_SUCCESS, list);
// export const fetchError = (message: string) => action(LensesActionTypes.FETCH_ERROR, message);

// export const fetchLenses: any = (order: Order) => (dispatch: Dispatch) => {
//   dispatch(fetchRequest());

//   return new Promise((resolver) => {
//     resolver(frames)
//   })
//   .then((frames: any) => {
//     dispatch(fetchSuccess(frames));
//   })
// };
