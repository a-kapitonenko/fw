import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';

import { ApplicationState } from '../store';
import { IOrderState } from '../store/order/types';
import { Frame } from '../store/frames/types';
import * as framesActions from '../store/frames/actions';

import FrameSelection from '../components/FrameSelection';
import FrameFavorite from '../components/FrameFavorite';

import '../styles/frameSelection.css';

type PropsFromState = {
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

type PropsFromDispatch = {
  handleFetch: typeof framesActions.fetchSimilarFrames;
  handleOpen: typeof framesActions.open;
  handleClose: typeof framesActions.close;
  setStep: typeof framesActions.setStep;
  setSelectedFrame: typeof framesActions.setSelectedFrame;
  handleConfirm: any;
}

type ComponentProps = PropsFromState & PropsFromDispatch;

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
  handleConfirm: (order: IOrderState, frame: Frame) => dispatch(framesActions.fetchSubmit(order, frame)),
});

class FrameSelectionContainer extends React.Component<ComponentProps> {
  public componentDidMount() {
    const { order, handleFetch } = this.props;

    handleFetch(order);
  }

  private handleClick = (frame: Frame) => {
    const { selectedFrame, setSelectedFrame } = this.props;

    if (selectedFrame === frame) {
      const emptyFrame = {} as Frame;

      setSelectedFrame(emptyFrame);
    } else {
      setSelectedFrame(frame);
    }
  };

  public render() {
    const {
      order,
      open, 
      step, 
      searchFrames, 
      filterFrames, 
      similarFrames, 
      selectedFrame, 
      setStep,
      handleConfirm, 
      handleClose, 
    } = this.props;

    return (
      <Dialog open={open} fullScreen={true} onEscapeKeyDown={() => handleClose()} className="frame-selection__wrapper">
        {step === 1 && (
          <FrameSelection
            searchFrames={searchFrames}
            filterFrames={filterFrames}
            selectedFrame={selectedFrame}
            setStep={setStep}
            setSelectedFrame={this.handleClick}
            handleClose={handleClose}
          />
        )}
        {step === 2 && (
          <FrameFavorite
            similarFrames={similarFrames}
            selectedFrame={selectedFrame}
            setStep={setStep}
            setSelectedFrame={this.handleClick}
            onConfirm={(frame: Frame) => handleConfirm(order, frame)}
          />
        )}
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSelectionContainer);
