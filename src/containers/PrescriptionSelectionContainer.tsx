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
  isFetching: boolean,
  errors: string,
  prescription: Prescription,
  frame: Frame,
};

type PropsFromDispatch = {
  setRxInformation: typeof orderActions.setRxInformation,
  savePrescription: typeof orderActions.savePrescriptionStart,
  saveFailed: typeof orderActions.savePrescriptionFailed,
  saveClear: typeof orderActions.savePrescriptionClear,
};

type ComponentProps = PropsFromState & PropsFromDispatch;

type StateProps = {
  value: any;
};

const mapStateToProps = (state: ApplicationState) => ({
  isFetching: state.order.isFetching || state.lenses.isFetching || state.frames.isFetching,
  errors: state.order.errors.prescription,
  prescription: state.order.boss.prescription,
  frame: state.order.boss.frame,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setRxInformation: (type: string, field: string, value: string) => {
    return dispatch(orderActions.setRxInformation(type, field, value));
  },
  savePrescription: (prescription: Prescription) => {
    return dispatch(orderActions.savePrescriptionStart(prescription));
  },
  saveFailed: (error: string) => {
    return dispatch(orderActions.savePrescriptionFailed(error));
  },
  saveClear: () => {
    return dispatch(orderActions.savePrescriptionClear());
  },
});

class PrescriptionSelectionContainer extends React.Component<ComponentProps> {
  state: StateProps = { value: '' };

  private handleChange = (type: string, field: string, value: string) => {
    const { errors, setRxInformation, saveClear } = this.props;

    setRxInformation(type, field, value);

    if (errors) {
      saveClear();
    }
  }

  private handleSubmit = () => {
    const { prescription, savePrescription, saveFailed } = this.props;
    const prescriptionFilled = isPrescriptionFilled(prescription);

    if (prescriptionFilled) {
      savePrescription(prescription);
    } else {
      saveFailed('Please fill in all fields');
    }
  }

  public render() {
    const { isFetching, errors, prescription, frame } = this.props;
    const readOnly = !isEmptyObject(frame);

    return (
      <PrescriptionSelection
        disabled={isFetching}
        errors={errors}
        prescription={prescription}
        readOnly={readOnly}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionSelectionContainer);
