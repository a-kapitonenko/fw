import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ApplicationState } from '../store';
import { Prescription } from '../store/order/types';
import { Lens } from '../store/lenses/types';
import * as lensesActions from '../store/lenses/actions';

import LensSelection from '../components/LensSelection';

import '../styles/lensSelection.css';

type PropsFromState = {
  isFetching: boolean;
  errors: string;
  lenses: Lens[];
  selectedLens: Lens;
  prescription: Prescription;
};

type PropsFromDispatch = {
  clearErrors: typeof lensesActions.clearErrors;
  saveLens: typeof lensesActions.saveLens;
};

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  isFetching: state.order.isFetching,
  errors: state.lenses.errors,
  lenses: state.lenses.lenses,
  selectedLens: state.order.boss.lens,
  prescription: state.order.boss.prescription,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearErrors: () => dispatch(lensesActions.clearErrors()),
  saveLens: (prescription: Prescription, lens: Lens) => dispatch(lensesActions.saveLens(prescription, lens)),
});

class LensSelectionContainer extends React.Component<ComponentProps> {
  handleSubmit = (lens: Lens) => {
    const { prescription, errors, clearErrors, saveLens } = this.props;
    
    if(errors) {
      clearErrors();
    }

    saveLens(prescription, lens);
  }

  render() {
    const { isFetching, errors, lenses, selectedLens } = this.props;

    return (
      <LensSelection errors={errors} disabled={isFetching} lenses={lenses} selectedLens={selectedLens}  handleSubmit={this.handleSubmit} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LensSelectionContainer);
