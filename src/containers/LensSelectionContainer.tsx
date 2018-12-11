import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { Prescription } from '../store/order/types';
import { Lens } from '../store/lenses/types';
import * as lensesActions from '../store/lenses/actions';
// import { isEmptyObject } from '../helpers/mathHelper';
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
  saveLens: typeof lensesActions.saveLensStart;
  //checkLens: typeof lensesActions.checkLensStart;
};

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  isFetching: state.lenses.isFetching,
  errors: state.lenses.errors,
  lenses: state.lenses.lenses,
  selectedLens: state.order.boss.lens,
  prescription: state.order.boss.prescription,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveLens: (prescription: Prescription, lens: Lens) => dispatch(lensesActions.saveLensStart(prescription, lens)),
  //checkLens: (prescription: Prescription, lens: Lens) => dispatch(lensesActions.checkLensStart(prescription, lens)),
});

class LensSelectionContainer extends React.Component<ComponentProps> {
  // componentDidUpdate(prevProps: ComponentProps) {
  //   const { prescription, selectedLens, checkLens } = this.props;
  //   const isLensSelected = !isEmptyObject(selectedLens);

  //   if (prevProps.prescription !== prescription && isLensSelected) {
  //     checkLens(prescription, selectedLens);
  //   }
  // }

  handleSubmit = (lens: Lens) => {
    const { prescription, selectedLens, saveLens } = this.props;

    if (lens.name !== selectedLens.name ) {
      saveLens(prescription, lens);
    }
  }

  render() {
    const { isFetching, errors, lenses, selectedLens } = this.props;

    return (
      <LensSelection errors={errors} disabled={isFetching} lenses={lenses} selectedLens={selectedLens}  handleSubmit={this.handleSubmit} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LensSelectionContainer);
