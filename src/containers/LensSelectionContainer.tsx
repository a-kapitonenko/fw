import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ApplicationState } from '../store';
import { IOrderState, Prescription } from '../store/order/types';
import { Lens } from '../store/lenses/types';
import * as lensesActions from '../store/lenses/actions';
import * as orderActions from '../store/order/actions';

import LensSelection from '../components/LensSelection';

import '../styles/lensSelection.css';

type PropsFromState = {
  order: IOrderState;
  lenses: Lens[];
  errors: string;
};

type PropsFromDispatch = {
  handleClick: typeof orderActions.saveLens;
  resetError: typeof lensesActions.resetError;
};

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
  lenses: state.lenses.lenses,
  errors: state.lenses.errors,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleClick: (prescription: Prescription, lens: Lens) => dispatch(orderActions.saveLens(prescription, lens)),
  resetError: () => dispatch(lensesActions.resetError()),
});

class LensSelectionContainer extends React.Component<ComponentProps> {
  handleSubmit = (lens: Lens) => {
    const { order, errors, resetError, handleClick } = this.props;
    
    if(errors) {
      resetError();
    }

    handleClick(order.boss.prescription, lens);
  }

  render() {
    const { order, lenses, errors } = this.props;

    return <LensSelection order={order} lenses={lenses} errors={errors} handleSubmit={this.handleSubmit} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LensSelectionContainer);
