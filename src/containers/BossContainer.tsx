import * as React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { PrescriptionFields } from '../constants/prescription';
import { getCurrentDate } from '../helpers/bossHelper';

import { ApplicationState } from '../store';
import { IOrderState } from '../store/order/types';

import '../styles/orderSelection.css';

interface PropsFromState {
  order: IOrderState;
}

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
});

class Home extends React.Component<PropsFromState> {
  render() {
    const { order } = this.props;
    const date = getCurrentDate();

    return (
      <div className="page__content">
        <h1 className="page__title">Scan This Document To Your System</h1>        
        <section className="page__date-container">{date}</section>

        <section className="order-selection__section">
          <h2 className="order-selection__section-tittle">Input Rx Information</h2>
          {PrescriptionFields.map((element, index) => (
            <TextField 
              key={index}
              className="information__text" 
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
              label={`OD ${element.label}`}
              defaultValue={order.prescription.OD[element.id]}
            />
          ))}
          {PrescriptionFields.map((element, index) => (
            <TextField 
              key={index}
              className="information__text" 
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
              label={`OS ${element.label}`}
              defaultValue={order.prescription.OS[element.id]}
            />
          ))}
        </section>

        <section className="order-selection__section">
          <h2 className="order-selection__section-tittle">Product Information</h2>

          <section className="order-selection__section-field">
            <p>{order.lens.name}</p>
          </section>
        </section>

        <section className="order-selection__section">
          <h2 className="order-selection__section-tittle">Frame Information</h2>

          <section className="flex">
            <div className="flex" style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
              <section className="order-selection__section-field">
                <p>{order.fittingHeight}</p>
              </section>
              <section className="order-selection__section-field">
                <p>{order.frame.upc}</p>
                <p>{order.frame.label}</p>
              </section>
            </div> 
            <section className="order-selection__section-field" style={{ height: '200px', flex: 1 }}>
              <img  src={`/${order.frame.img}`} style={{ height: '100%', margin: 'auto' }}/>
            </section>
          </section>
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
