import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { ApplicationState } from '../store';
import { Prescription, Barcode } from '../store/order/types';
import * as orderActions from '../store/order/actions';
import { Lens } from '../store/lenses/types';
import { Frame } from '../store/frames/types';
import { getCurrentDate } from '../helpers/bossHelper';
import LinkComponent from '../components/LinkComponent';
import PrescriptionSelection from '../components/PrescriptionSelection';
import Section from '../components/Section';

import '../styles/boss.css';

type PropsFromState = {
  prescription: Prescription;
  lens: Lens;
  frame: Frame;
  fittingHeight: number;
  barcode: Barcode;
};

type PropsFromDispatch = {
  disableRedirect: typeof orderActions.disableRedirect;
};

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  prescription: state.order.boss.prescription,
  lens: state.order.boss.lens,
  frame: state.order.boss.frame,
  fittingHeight: state.order.boss.fittingHeight,
  barcode: state.order.boss.barcode,
});

const mapDispatchFromProps = (dispatch: Dispatch) => ({
  disableRedirect: () => dispatch(orderActions.disableRedirect()),
});

class BossContainer extends LinkComponent<ComponentProps> {
  render() {
    const { prescription, lens, frame, fittingHeight, barcode, disableRedirect } = this.props;
    const date = getCurrentDate();

    return (
      <main className="p-template__main">
        <h1 className="p-template__tittle">Scan This Document To Your System</h1>
        <div className="page__date">{date}</div>
        <PrescriptionSelection prescription={prescription} readOnly />
        <Section className="s-template__content" tittle="Selected NikonEyes Lens">
          <p>{lens.name}</p>
        </Section>
        <Section tittle="Frame Information" wrap>
          <div className="-flex">
            <div className="-flex order" style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
              <div className="s-template__content" style={{ height: '100px', flexDirection: 'column' }}>
                <p>UPC Code: {frame.upc}</p>
                <p>Name of Frame: {frame.label}</p>
              </div>
              <div className="s-template__content" style={{ margin: '0 2rem 2rem' }}>
                <p>Fitting Height: {fittingHeight}</p>
              </div>
            </div>
            <div className="s-template__content" style={{ height: '200px', flex: 1 }}>
              <img src={`/${frame.img}`} style={{ height: '100%', margin: 'auto' }} />
            </div>
          </div>
        </Section>
        <section className="s-template__content" style={{ height: '200px', width: '400px', margin: 'auto' }}>
          <img src={`/${barcode.img}`} style={{ height: '100%', margin: 'auto' }} />
        </section>
        <Button
          variant="contained"
          onClick={() => {
            disableRedirect();
            this.redirectToPage('/select');
          }}
        >
          Back
        </Button>
        <Button variant="contained" onClick={() => this.redirectToPage('/')}>Save</Button>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchFromProps)(BossContainer);
