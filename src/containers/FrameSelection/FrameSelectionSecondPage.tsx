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

type OwnProps = {
  setStep: (step: number) => void;
  handleClick: (frame: Frame) => void;
};

type PropsFromState = {
  isFetching: boolean;
  isSubmiting: boolean;
  errors: string,
  boss: Boss;
  selectedFrame: Frame;
  similarFrames: Frame[];
};

type MergeProps = OwnProps & PropsFromState;

type PropsFromDispatch = {
  handleSubmit: typeof framesActions.submitStart;
  fetchSimilarFrames: typeof framesActions.fetchSimilarFramesStart;
};

type ComponentProps = MergeProps & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState, ownProps: OwnProps) => ({
  isFetching: state.frames.similarFrames.isFetching,
  isSubmiting: state.frames.isFetching,
  errors: state.frames.similarFrames.errors,
  boss: state.order.boss,
  selectedFrame: state.frames.selectedFrame,
  similarFrames: state.frames.similarFrames.data,
  setStep: ownProps.setStep,
  handleClose: ownProps.handleClick,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleSubmit: (boss: Boss, frame: Frame) => dispatch(framesActions.submitStart(boss, frame)),
  fetchSimilarFrames: (boss: Boss) => dispatch(framesActions.fetchSimilarFramesStart(boss)),
});

class FrameSelectionSecondPage extends React.Component<ComponentProps> {
  public componentDidMount() {
    const { boss, similarFrames, fetchSimilarFrames } = this.props;
    const isEmptySimilarFrames = isEmptyObject(similarFrames);
    if (isEmptySimilarFrames) {
      fetchSimilarFrames(boss);
    }
  }

  public render() {
    const { isFetching, isSubmiting, errors, boss, selectedFrame, similarFrames, handleSubmit, setStep, handleClick } = this.props;
    const buttonDisabled = isEmptyObject(selectedFrame);

    return (
      <React.Fragment>
        <h1 className="p-template__tittle">Similar Frames</h1>
        {errors && <div className="frame-selection__error">{errors}</div>}
        <section className="frame-selection__form">
          <h2 className="p-template__tittle">
            These frames are also compatible with the patients Rx and lens selection <br />
            Continue if patient is happy with current frame selection
          </h2>
          <FrameTable isFetching={isFetching} disabled={isSubmiting} frames={similarFrames} selectedFrame={selectedFrame} handleClick={handleClick} />
          <section className="frame-selection__form-actions">
            <Button className="frame-selection__form-button" variant="contained" disabled={isSubmiting} onClick={() => setStep(1)}>Back</Button>
            <Button
              className="frame-selection__form-button"
              variant="contained"
              disabled={isSubmiting || buttonDisabled}
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
