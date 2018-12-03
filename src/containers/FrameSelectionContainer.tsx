import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ApplicationState } from '../store';
import { IOrderState } from '../store/order/types';
import { Frame } from '../store/frames/types';
import * as framesActions from '../store/frames/actions';

import { isEmptyObject } from '../helpers/mathHelper';

import FrameSelection from '../components/FrameSelection';
import FrameFavorite from '../components/FrameFavorite';

import '../styles/frameSelection.css';

type PropsFromState = {
  order: IOrderState;
  isFetching: boolean;
  errors: string;
  open: boolean;
  step: number;
  searchFrames: Frame[];
  filterFrames: Frame[];
  selectedFrame: Frame;
  similarFrames: Frame[];
};

type PropsFromDispatch = {
  handleFetch: typeof framesActions.fetchSimilarFrames;
  handleOpen: typeof framesActions.open;
  handleClose: typeof framesActions.close;
  setStep: typeof framesActions.setStep;
  setSelectedFrame: typeof framesActions.setSelectedFrame;
  resetSelectedFrame: typeof framesActions.resetSelectedFrame;
  resetSimilarFrames: typeof framesActions.resetSimilarFrames;
  handleSubmit: typeof framesActions.fetchSubmit;
};

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
  isFetching: state.frames.isFetching,
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
  resetSelectedFrame: () => dispatch(framesActions.resetSelectedFrame()),
  resetSimilarFrames: () => dispatch(framesActions.resetSimilarFrames()),
  handleSubmit: (order: IOrderState, frame: Frame) => dispatch(framesActions.fetchSubmit(order, frame)),
});

class FrameSelectionContainer extends React.Component<ComponentProps> {
  public componentDidUpdate(prevProps: ComponentProps) {
    const { order, step, similarFrames, handleFetch } = this.props;
    const isEmptySimilarFrames = isEmptyObject(similarFrames);

    if (step === 2 && prevProps.step === 1 && isEmptySimilarFrames) {
      handleFetch(order);
    }
  }

  private handleClick = (frame: Frame) => {
    const { selectedFrame, setSelectedFrame, resetSelectedFrame } = this.props;

    if (selectedFrame === frame) {
      resetSelectedFrame();
    } else {
      setSelectedFrame(frame);
    }
  };

  public render() {
    const {
      order,
      isFetching,
      open,
      step,
      searchFrames,
      filterFrames,
      similarFrames,
      selectedFrame,
      resetSelectedFrame,
      setStep,
      handleSubmit,
      handleClose,
    } = this.props;
    const isFrameSelected = !isEmptyObject(selectedFrame);

    return (
      <Dialog open={open} fullScreen={true} onEscapeKeyDown={() => handleClose()} className="frame-selection__wrapper">
        <div className="frame-selection__content yellow-section">
        {isFetching && <CircularProgress className="page__progress"/>}
          {isFrameSelected && (
            <div className="frame-selection__frame-selected">
              <div>{selectedFrame.value}</div>
              <div>{selectedFrame.label}</div>
              <div className="-flex"><img className="frame-search__img" src={`/${selectedFrame.img}`} /></div>
              <div>{selectedFrame.compatibility ? 'true' : 'false'}</div>
              <div>
                <IconButton
                  color="inherit"
                  aria-label="Menu"
                  onClick={resetSelectedFrame}
                >
                  <Close />
                </IconButton>
              </div>
            </div>
          )}
          {step === 1 && (
            <FrameSelection
              searchFrames={searchFrames}
              filterFrames={filterFrames}
              selectedFrame={selectedFrame}
              buttonDisabled={!isFrameSelected}
              setStep={setStep}
              setSelectedFrame={this.handleClick}
              handleClose={handleClose}
            />
          )}
          {step === 2 && (
            <FrameFavorite
              similarFrames={similarFrames}
              selectedFrame={selectedFrame}
              buttonDisabled={!isFrameSelected}
              setStep={setStep}
              setSelectedFrame={this.handleClick}
              handleSubmit={(frame: Frame) => handleSubmit(order, frame)}
            />
          )}
        </div>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSelectionContainer);
