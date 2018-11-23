import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import { ApplicationState } from '../store';
import { IOrderState } from '../store/order/types';
import { Frame } from '../store/frames/types';
import * as framesActions from '../store/frames/actions';

import FrameSearchContainer from './FrameSearchContainer';
import FrameFilterContainer from './FrameFilterContainer';
import FrameSearchTable from '../components/FrameSearchTable';
import FrameTable from '../components/FrameTable';

import '../styles/frameSelection.css';

interface PropsFromState {
  order: IOrderState;
  fetching: boolean;
  errors: string;
  open: boolean;
  step: number;
  searchFrames: Frame[];
  filterFrames: Frame[];
  selectedFrame: Frame;
  similarFrames: Frame[];
}

interface PropsFromDispatch {
  handleFetch: typeof framesActions.fetchSimilarFrames;
  handleOpen: typeof framesActions.open;
  handleClose: typeof framesActions.close;
  setStep: typeof framesActions.setStep;
  setSelectedFrame: typeof framesActions.setSelectedFrame;
}

type AllProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
  fetching: state.frames.fetching,
  errors: state.frames.errors,
  open: state.frames.open,
  step: state.frames.step,
  searchFrames: state.search.selectedFrames,
  filterFrames: state.filter.frames,
  selectedFrame: state.frames.selectedFrame,
  similarFrames: state.frames.similarFrames,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetch: (order: IOrderState) => dispatch(framesActions.fetchSimilarFrames(order)),
  handleOpen: () => dispatch(framesActions.open()),
  handleClose: () => dispatch(framesActions.close()),
  setStep: (step: number) => dispatch(framesActions.setStep(step)),
  setSelectedFrame: (frame: Frame) => dispatch(framesActions.setSelectedFrame(frame)),
});

class FrameSelection extends React.Component<AllProps> {
  public componentDidMount() {
    const { order, handleFetch } = this.props;

    handleFetch(order);
  }

  public render() {
    const { open, searchFrames, filterFrames, selectedFrame, handleClose, setStep, setSelectedFrame } = this.props;
    return (
      <Dialog open={open} fullScreen={true} onEscapeKeyDown={() => handleClose()} className="frame-selection__wrapper">
        <div className="frame-selection__content yellow-section">
          <h1 className="frame-selection__title">Tailored Frame Selection</h1>
          <section className="frame-selection__form">
            <div className="frame-selection__form-content">
              <div className="frame-selection__form-section">
                <FrameSearchContainer />
                <FrameSearchTable frames={searchFrames} selectedFrame={selectedFrame} handleClick={setSelectedFrame} />
              </div>
              <div className="frame-selection__form-section">
                <FrameFilterContainer />
                <FrameTable frames={filterFrames} selectedFrame={selectedFrame} handleClick={setSelectedFrame} />
              </div>
            </div>
            <section className="frame-selection__form-actions">
              <Button className="frame-selection__form-button" variant="contained" onClick={handleClose}>Back</Button>
              <Button className="frame-selection__form-button" variant="contained" onClick={() => setStep(1)}>Next</Button>
            </section>
          </section>
        </div>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSelection);
