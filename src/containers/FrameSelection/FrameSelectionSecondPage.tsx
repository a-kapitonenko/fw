import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { ApplicationState } from '../../store';
import { Frame } from '../../store/frames/types';
import { Boss } from '../../store/order/types';
import * as framesActions from '../../store/frames/actions';

import { isEmptyObject } from '../../helpers/mathHelper';

import FrameTable from '../../components/FrameTable';

import '../../styles/frameSelection.css';

type PropsFromState = {
  isFetching: boolean;
  errors: string,
  boss: Boss;
  selectedFrame: Frame;
  similarFrames: Frame[];
};

type PropsFromDispatch = {
  handleSubmit: typeof framesActions.fetchSubmit;
  fetchSimilarFrames: typeof framesActions.fetchSimilarFrames;
  setStep: typeof framesActions.setStep;
  setSelectedFrame: typeof framesActions.setSelectedFrame;
  resetSelectedFrame: typeof framesActions.resetSelectedFrame;
};

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  isFetching: state.frames.isFetching,
  errors: state.frames.errors.similarFrames,
  boss: state.order.boss,
  selectedFrame: state.frames.selectedFrame,
  similarFrames: state.frames.similarFrames,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleSubmit: (boss: Boss, frame: Frame) => dispatch(framesActions.fetchSubmit(boss, frame)),
  fetchSimilarFrames: (boss: Boss) => dispatch(framesActions.fetchSimilarFrames(boss)),
  setStep: (step: number) => dispatch(framesActions.setStep(step)),
  setSelectedFrame: (frame: Frame) => dispatch(framesActions.setSelectedFrame(frame)),
  resetSelectedFrame: () => dispatch(framesActions.resetSelectedFrame()),
});

class FrameSelectionSecondPage extends React.Component<ComponentProps> {
  public componentDidMount() {
    const { boss, similarFrames, fetchSimilarFrames } = this.props;
    const isEmptySimilarFrames = isEmptyObject(similarFrames);
    if (isEmptySimilarFrames) {
      fetchSimilarFrames(boss);
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
    const { isFetching, errors, boss, selectedFrame, similarFrames, handleSubmit, setStep } = this.props;
    const buttonDisabled = isEmptyObject(selectedFrame);

    return (
      <React.Fragment>
        <h1 className="frame-selection__title">Similar Frames</h1>
        {errors && <div className="frame-selection__error">{errors}</div>}
        <section className="frame-selection__form">
          <h2 className="frame-selection__form-title">
            These frames are also compatible with the patients Rx and lens selection <br />
            Continue if patient is happy with current frame selection
          </h2>
          <FrameTable disabled={isFetching} frames={similarFrames} selectedFrame={selectedFrame} handleClick={this.handleClick} />
          <section className="frame-selection__form-actions">
            <Button className="frame-selection__form-button" variant="contained" disabled={isFetching} onClick={() => setStep(1)}>Back</Button>
            <Button
              className="frame-selection__form-button"
              variant="contained"
              disabled={isFetching || buttonDisabled}
              onClick={() => handleSubmit(boss, selectedFrame)}
            >
              Confirm
            </Button>
          </section>
        </section>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSelectionSecondPage);
