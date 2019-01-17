import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { Prescription, Barcode } from '../store/order/types';
import * as orderActions from '../store/order/actions';
import { Lens } from '../store/lenses/types';
import { Frame } from '../store/frames/types';
import { getCurrentDate } from '../helpers/bossHelper';
import LinkComponent from '../components/LinkComponent';
import Boss from '../components/Boss';

type PropsFromState = {
  redirect: boolean;
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
  redirect: state.order.redirect,
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
  componentDidMount() {
    const { redirect } = this.props;

    if (!redirect) {
      this.redirectToPage('/select');
    }
  }

  onClick = () => {
    const { disableRedirect } = this.props;

    disableRedirect();
    this.redirectToPage('/select');
  };

  render() {
    const { prescription, lens, frame, fittingHeight, barcode } = this.props;
    const date = getCurrentDate();

    return (
      <Boss
        date={date}
        prescription={prescription}
        lens={lens}
        frame={frame}
        fittingHeight={fittingHeight}
        barcode={barcode}
        onClick={this.onClick}
        redirectToPage={this.redirectToPage}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchFromProps)(BossContainer);
