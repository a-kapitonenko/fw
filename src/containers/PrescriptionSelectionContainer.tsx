import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ApplicationState } from '../store';
import { IOrderState } from '../store/order/types';
import * as orderActions from '../store/order/actions';

import { isEmptyObject } from '../helpers/mathHelper';
import { isPrescriptionFilled } from '../helpers/orderSelectionHelper';

import PrescriptionSelection from '../components/PrescriptionSelection';

type PropsFromState = {
  order: IOrderState;
}

type PropsFromDispatch = {
  handleChange: typeof orderActions.setRxInformation,
  savePrescription: typeof orderActions.savePrescription,
}

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleChange: (type: string, field: string, value: string) => dispatch(orderActions.setRxInformation(type, field, value)),
  savePrescription: (prescription: any) => dispatch(orderActions.savePrescription(prescription)),
});

class PrescriptionSelectionContainer extends React.Component<ComponentProps> {
  componentDidUpdate(prevProps: ComponentProps) {
    const { order, savePrescription } = this.props;
    const prescriptionFilled = isPrescriptionFilled(order.prescription);

    if (order.prescription !== prevProps.order.prescription && prescriptionFilled) {
      savePrescription(order.prescription);
    }
  }

  render() {
    const { order, handleChange } = this.props;
    const readOnly = !isEmptyObject(order.frame);

    return (
      <PrescriptionSelection order={order} readOnly={readOnly} handleChange={handleChange}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionSelectionContainer);
