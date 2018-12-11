import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { ApplicationState } from '../../store';
import { Boss } from '../../store/order/types';
import { Frame } from '../../store/frames/types';
import * as framesActions from '../../store/frames/actions';
import { isEmptyObject } from '../../helpers/mathHelper';
import FrameSelectionFirstPage from './FrameSelectionFirstPage';
import FrameSelectionSecondPage from './FrameSelectionSecondPage';
import '../../styles/frameSelection.css';

type PropsFromState = {
  isFetching: boolean;
  open: boolean;
  selectedFrame: Frame;
  boss: Boss;
};

type PropsFromDispatch = {
  setSelectedFrame: typeof framesActions.setSelectedFrame;
  clearSelectedFrame: typeof framesActions.clearSelectedFrame;
  checkFrame: typeof framesActions.checkFrameStart;
  clearResult: typeof framesActions.clearResult;
};

type ComponentProps = PropsFromState & PropsFromDispatch;

type StateProps = {
  step: number;
};

const mapStateToProps = (state: ApplicationState) => ({
  isFetching: state.frames.isFetching,
  open: state.frames.open,
  selectedFrame: state.frames.selectedFrame,
  boss: state.order.boss,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSelectedFrame: (frame: Frame) => dispatch(framesActions.setSelectedFrame(frame)),
  clearSelectedFrame: () => dispatch(framesActions.clearSelectedFrame()),
  checkFrame: (boss: Boss) => dispatch(framesActions.checkFrameStart(boss)),
  clearResult: () => dispatch(framesActions.clearResult()),
});

class FrameSelectionContainer extends React.Component<ComponentProps> {
  state: StateProps = { step: 1 }

  componentDidUpdate(prevProps: ComponentProps) {
    const { boss, checkFrame, clearResult } = this.props;
    const isLensSelected = !isEmptyObject(prevProps.boss.lens);
    const isBossFrameSelected = !isEmptyObject(boss.frame);

    if (boss.lens.value !== prevProps.boss.lens.value && isLensSelected) {
      if (isBossFrameSelected) {
        checkFrame(boss);
      }

      clearResult();
    }
  }

  private changeStep = (step: number) => {
    this.setState({ step });
  };

  private handleClick = (frame: Frame) => {
    const { selectedFrame, setSelectedFrame, clearSelectedFrame } = this.props;
    if (frame.compatibility) {
      if (selectedFrame === frame) {
        clearSelectedFrame();
      } else {
        setSelectedFrame(frame);
      }
    } else {
    }
  }

  public render() {
    const { isFetching, open, selectedFrame, clearSelectedFrame } = this.props;
    const { step } = this.state;

    const isFrameSelected = !isEmptyObject(selectedFrame);

    return (
      <Dialog open={open} fullScreen={true} className="frame-selection">
        {isFetching &&  <CircularProgress className="frame-selection__progress" />}
        <div className="frame-selection__content yellow-section">
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
                  onClick={clearSelectedFrame}
                >
                  <Close />
                </IconButton>
              </div>
            </div>
          )}
          {step === 1 && <FrameSelectionFirstPage setStep={this.changeStep} handleClick={this.handleClick} />}
          {step === 2 && <FrameSelectionSecondPage setStep={this.changeStep} handleClick={this.handleClick} />}
        </div>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSelectionContainer);
