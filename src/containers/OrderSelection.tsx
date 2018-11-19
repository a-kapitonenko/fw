import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { ApplicationState } from '../store';
import { IOrderState } from '../store/order/types';

import { isEmptyObject } from '../helpers/mathHelper';

import LinkComponent from '../components/LinkComponent';
import Section from '../components/Section';
import PrescriptionSelectionContainer from './PrescriptionSelectionContainer';
import LensSelectionContainer from './LensSelectionContainer';

import '../styles/orderSelection.css';

type PropsFromState = {
  order: IOrderState;
}

type PropsFromDispatch = {

}

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

class OrderSelection extends LinkComponent<ComponentProps> {
  render() {
    const { order } = this.props;
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
          <Button variant="contained" disabled={frameSelectionButtonDisabled} onClick={() => this.redirectToPage('/select-frame')}>
            Frame Selection
          </Button>
        </Section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelection);
