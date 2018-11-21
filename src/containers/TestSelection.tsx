import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import * as framesActions from '../store/frames/actions';
import { IOrderState } from '../store/order/types';
import { ApplicationState } from '../store';

import FrameSearch from './FrameSearch';
import FrameFilter from './FrameFilter';

import '../styles/frameSelection.css';

interface PropsFromState {
  order: IOrderState;
  open: boolean;
}

interface PropsFromDispatch {
  handleFetch: typeof framesActions.fetchFrames;
  handleOpen: typeof framesActions.open;
  handleClose: typeof framesActions.close;
}

type AllProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
  open: state.frames.open,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetch: (order: IOrderState) => dispatch(framesActions.fetchFrames(order)),
  handleOpen: () => dispatch(framesActions.open()),
  handleClose: () => dispatch(framesActions.close()),
});

class Test extends React.Component<AllProps> {
  componentDidMount() {
    const { order, handleFetch } = this.props;

    handleFetch(order);
  }

  render() {
    const { open, handleClose } = this.props;
    return (
      <Dialog open={open} fullScreen={true} onEscapeKeyDown={() => handleClose()} className="frame-selection__wrapper">
        <div className="frame-selection__content">
          <h1 className="frame-selection__title">Tailored Frame Selection</h1>
          <section className="frame-selection__form">
            <div className="frame-selection__form-content">
              <FrameSearch />
              <FrameFilter />
            </div>
            <section className="frame-selection__form-actions">
              <Button className="frame-selection__form-button" variant="contained">Back</Button>
              <Button className="frame-selection__form-button" variant="contained">Next</Button>
            </section>
          </section>
        </div>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
