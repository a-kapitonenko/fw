import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import * as framesActions from '../store/frames/actions';
import * as orderActions from '../store/order/actions';

import { Frame } from '../store/frames/types';
import { IOrderState } from '../store/order/types';
import { ApplicationState } from '../store';

import FavoriteFramesTable from '../components/FavoriteFramesTable';

import '../styles/frameSelection.css';

interface PropsFromState {
  order: IOrderState;
  similarFrames: Frame[];
  selectedFrame: Frame;
}

interface PropsFromDispatch {
  handleFetch: typeof framesActions.fetchSimilarFrames;
  handleClick: typeof framesActions.setSelectedFrame;
  handleSubmit: any;
}

type AllProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
  similarFrames: state.frames.similarFrames,
  selectedFrame: state.frames.selectedFrame,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetch: (order: IOrderState) => dispatch(framesActions.fetchSimilarFrames(order)),
  handleClick: (frame: Frame) => dispatch(framesActions.setSelectedFrame(frame)),
  handleSubmit: (frame: Frame) => {
    dispatch(framesActions.setSelected([]));
    dispatch(orderActions.setFrame(frame));
  },
});

class FavoriteFramesContainer extends React.Component<AllProps> {
  componentDidMount() {
    const { order, handleFetch } = this.props;

    handleFetch(order);
  }

  render() {
    const { similarFrames, selectedFrame, handleClick, handleSubmit } = this.props;

    return (
      <div className="page__content">
        <h1 className="page__title">Similar Frames</h1>

        <section className="frame-selection__form">
          <h2 className="frame-selection__form-title">
            These frames are also compatible with the patients Rx and lens selection <br />
            Continue if patient is happy with current frame selection
          </h2>
          <FavoriteFramesTable list={similarFrames} selectedFrame={selectedFrame} handleClick={handleClick} />
          <section className="frame-selection__form-actions">
            <Link to="/select-frame/">
              <Button className="frame-selection__form-button" variant="contained">Back</Button>
            </Link>
            <Link to="/order" onClick={() => handleSubmit(selectedFrame)}>
              <Button className="frame-selection__form-button" variant="contained">Next</Button>
            </Link>
          </section>
        </section>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteFramesContainer);
