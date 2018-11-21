import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import * as framesActions from '../store/frames/actions';
import { IOrderState } from '../store/order/types';
import { ApplicationState } from '../store';

import FrameSearch from './FrameSearch';

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
    const { open } = this.props;
    return (
      <Dialog open={open} className="aaaaa" fullScreen={true}>
        <h1 className="page__title">Tailored Frame Selection</h1>
        <section className="frame-selection__form">
          <h2 className="frame-selection__form-title">Please enter up to five frame UPC's to check for compatibility and select the one that best suits the patient</h2>
          <div>
          <FrameSearch />
          <FrameSearch />
          </div>
          <section className="frame-selection__form-actions">
            <Link to="/">
              <Button className="frame-selection__form-button" variant="contained">Back</Button>
            </Link>
            <Link to="/select-frame/favorite/">
              <Button className="frame-selection__form-button" variant="contained">Next</Button>
            </Link>
          </section>
        </section>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
