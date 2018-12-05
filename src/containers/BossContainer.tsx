import * as React from 'react';
import { connect } from 'react-redux';

import { getCurrentDate } from '../helpers/bossHelper';

import { ApplicationState } from '../store';
import { Boss } from '../store/order/types';

import PrescriptionSelection from '../components/PrescriptionSelection';
import Section from '../components/Section';

import '../styles/orderSelection.css';

interface PropsFromState {
  boss: Boss;
}

const mapStateToProps = (state: ApplicationState) => ({
  boss: state.order.boss,
});

class Home extends React.Component<PropsFromState> {
  render() {
    const { boss } = this.props;
    const date = getCurrentDate();

    return (
      <div className="page__content">
        <h1 className="page__title">Scan This Document To Your System</h1>
        <section className="page__date-container">{date}</section>
        <PrescriptionSelection prescription={boss.prescription} readOnly />
        <Section className="order-selection__field" tittle="Selected NikonEyes Lens">
          <p>{boss.lens.name}</p>
        </Section>
        <section className="order-selection__section">
          <h2 className="order-selection__section-tittle">Frame Information</h2>

          <div className="-flex">
            <div className="-flex" style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
              <div className="order-selection__field" style={{ height: '100px', flexDirection: 'column' }}>
                <p>UPC Code: {boss.frame.upc}</p>
                <p>Name of Frame: {boss.frame.label}</p>
              </div>
              <div className="order-selection__field" style={{margin: '0 2rem 2rem'}}>
                <p>Fitting Height: {boss.fittingHeight}</p>
              </div>
            </div>
            <div className="order-selection__field" style={{ height: '200px', flex: 1 }}>
              <img src={`/${boss.frame.img}`} style={{ height: '100%', margin: 'auto' }} />
            </div>
          </div>
        </section>
        <section className="order-selection__field" style={{ height: '200px', width: '400px', margin: 'auto' }}>
          <img src={`/${boss.barcode.img}`} style={{ height: '100%', margin: 'auto' }} />
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
