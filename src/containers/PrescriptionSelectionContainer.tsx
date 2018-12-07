import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ApplicationState } from '../store';
import { Prescription } from '../store/order/types';
import { Frame } from '../store/frames/types';
import * as orderActions from '../store/order/actions';

import { isEmptyObject } from '../helpers/mathHelper';
import { isPrescriptionFilled } from '../helpers/orderSelectionHelper';

import PrescriptionSelection from '../components/PrescriptionSelection';

type PropsFromState = {
  disabled: boolean,
  prescription: Prescription,
  frame: Frame,
};

type PropsFromDispatch = {
  handleChange: typeof orderActions.setRxInformation,
  savePrescription: typeof orderActions.savePrescriptionStart,
};

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  disabled: state.order.isFetching || state.lenses.isFetching,
  prescription: state.order.boss.prescription,
  frame: state.order.boss.frame,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleChange: (type: string, field: string, value: string) => dispatch(orderActions.setRxInformation(type, field, value)),
  savePrescription: (prescription: Prescription) => dispatch(orderActions.savePrescriptionStart(prescription)),
});

class PrescriptionSelectionContainer extends React.Component<ComponentProps> {
  public componentDidUpdate(prevProps: ComponentProps) {
    const { prescription, savePrescription } = this.props;
    const prescriptionFilled = isPrescriptionFilled(prescription);

    if (prescription !== prevProps.prescription && prescriptionFilled) {
      savePrescription(prescription);
    }
  }

  public render() {
    const { disabled, prescription, frame, handleChange } = this.props;
    const readOnly = !isEmptyObject(frame);

    return (
      <PrescriptionSelection disabled={disabled} prescription={prescription} readOnly={readOnly}  handleChange={handleChange} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionSelectionContainer);
