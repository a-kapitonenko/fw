import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { ApplicationState } from '../store';
import { IOrderState } from '../store/order/types';
import * as framesActions from '../store/frames/actions';

import { isEmptyObject } from '../helpers/mathHelper';

import LinkComponent from '../components/LinkComponent';
import Section from '../components/Section';
import PrescriptionSelectionContainer from './PrescriptionSelectionContainer';
import LensSelectionContainer from './LensSelectionContainer';
import TestSelection from '../containers/TestSelection';

import '../styles/orderSelection.css';

type PropsFromState = {
  order: IOrderState;
}

type PropsFromDispatch = {
  handleOpen: typeof framesActions.open;
}

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleOpen: () => dispatch(framesActions.open()),
});

class OrderSelection extends LinkComponent<ComponentProps> {
  render() {
    const { order, handleOpen } = this.props;
    const frameSelectionButtonDisabled = isEmptyObject(order.lens);

    return (
      <div className="page__content">
        <PrescriptionSelectionContainer />

        <Section className="order-selection__recommend" tittle="Recommendation">
          <p>{order.recommendation}</p>
        </Section>

        <LensSelectionContainer />

        <Section className="order-selection__field" tittle="Selected NikonEyes Lens">
          <p>{order.lens.name}</p>
        </Section>

        <Section tittle="The following frames are best suited for the patient" wrap>
          <Button variant="contained" disabled={frameSelectionButtonDisabled} onClick={handleOpen}>
            Frame Selection
          </Button>
          <TestSelection />
        </Section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelection);
