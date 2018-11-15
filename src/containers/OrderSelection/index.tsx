import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import * as orderActions from '../../store/order/actions';
import { ApplicationState } from '../../store';
import { OrderState } from '../../store/order/types';

import PrescriptionSelection from '../PrescriptionSelection';
import LensSelectionContainer from '../LensSelectionContainer';

import '../../styles/orderSelection.css';

interface PropsFromState {
  order: OrderState;
}

interface PropsFromDispatch {
  savePrescription: any;
}

type AllProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  savePrescription: (values: OrderState) => dispatch(orderActions.savePrescription(values)),
});

class Home extends React.Component<AllProps> {
  render() {
    const { order, savePrescription } = this.props;

    return (
      <div className="page__content">
        <section className="order-selection__section">
          <h2 className="order-selection__section-tittle">Input Rx Information</h2>
          <PrescriptionSelection onSubmit={savePrescription}/>
        </section>

        <section className="order-selection__section">
          <h2 className="order-selection__section-tittle">Recommendation</h2>
          <section className="order-selection__section-recommend">
            <p>{order.recommendation}</p>
          </section>
        </section>

        <section className="order-selection__section">
          <h2 className="order-selection__section-tittle">
            The following products can be used with the patients prescription<br />
            (Select the best NikonEyes Lens that best fits your needs)
          </h2>
          <LensSelectionContainer />
        </section>

        <section className="order-selection__section">
          <h2 className="order-selection__section-tittle">Selected NikonEyes Lens</h2>

          <section className="order-selection__section-field">
            <p>{order.lens.name}</p>
          </section>
        </section>

        <section className="order-selection__section">
          <h2 className="order-selection__section-tittle">The following frames are best suited for the patient</h2>
          <Link className="order-selection__button" to="/select-frame">
            <Button variant="contained">
              Frame Selection
            </Button>
          </Link>
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
