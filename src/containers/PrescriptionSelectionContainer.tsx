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
  errors: string,
  prescription: Prescription,
  frame: Frame,
};

type PropsFromDispatch = {
  handleChange: typeof orderActions.setRxInformation,
  savePrescription: typeof orderActions.savePrescriptionStart,
};

type ComponentProps = PropsFromState & PropsFromDispatch;

type StateProps = {
  value: any;
};

const mapStateToProps = (state: ApplicationState) => ({
  disabled: state.order.isFetching || state.lenses.isFetching,
  errors: state.order.errors.prescription,
  prescription: state.order.boss.prescription,
  frame: state.order.boss.frame,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleChange: (type: string, field: string, value: string) => {
    return dispatch(orderActions.setRxInformation(type, field, value));
  },
  savePrescription: (prescription: Prescription) => { 
    return dispatch(orderActions.savePrescriptionStart(prescription));
  },
});

class PrescriptionSelectionContainer extends React.Component<ComponentProps> {
  state: StateProps = { value: '' };

  private handleFocus = (value: string) => {
    this.setState({ value })
  };

  private handleBlur = (value: string) => {
    const prevValue = this.state.value;
    const { prescription, savePrescription } = this.props;
    const prescriptionFilled = isPrescriptionFilled(prescription);

    if (prescriptionFilled && prevValue !== value) {
      savePrescription(prescription);
    }
  };

  public render() {
    const { disabled, errors, prescription, frame, handleChange } = this.props;
    const readOnly = !isEmptyObject(frame);

    return (
      <PrescriptionSelection
        disabled={disabled}
        errors={errors}
        prescription={prescription}
        readOnly={readOnly}
        onFocus={this.handleFocus}
        onChange={handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionSelectionContainer);
