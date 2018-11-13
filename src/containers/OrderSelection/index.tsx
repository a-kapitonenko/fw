import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import * as orderActions from '../../store/order/actions';
import { ApplicationState } from '../../store';
import { OrderState } from '../../store/order/types';

// import InputInformation from '../../components/InputInformation';
import InputInformation from '../PrescriptionSelection';

import '../../styles/orderSelection.css';

interface PropsFromState {
  recommendation: string;
}

interface PropsFromDispatch {
  handleRxInformation: any;
}

type AllProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  recommendation: state.order.recommendation,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleRxInformation: (type: string, field: string, value: string) => dispatch(orderActions.setRxInformation(type, field, value)),
});

class Home extends React.Component<AllProps> {
  render() {
    const { recommendation, handleRxInformation } = this.props;

    return (
      <div className="page__content">
        <section className="order-selection__section">
          <h2 className="order-selection__section-tittle">Input Rx Information</h2>
          <InputInformation handleRxInformation={handleRxInformation} onSubmit={(value: OrderState) => console.log(1)}/>
          
        </section>

        <section className="order-selection__section">
          <h2 className="order-selection__section-tittle">Recommendation</h2>
          <section className="order-selection__section-recommend">
            <p>{recommendation}</p>
          </section>
        </section>

        <section className="order-selection__section">
          <h2 className="order-selection__section-tittle">The following frames are best suited for the patient</h2>
          <Link className="order-selection__button" to="/select">
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
