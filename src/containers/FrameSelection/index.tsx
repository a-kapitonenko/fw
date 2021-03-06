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
  handleClose: typeof framesActions.close;
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
  handleClose: () => dispatch(framesActions.close()),
});

class FrameSelectionContainer extends React.Component<ComponentProps> {
  state: StateProps = { step: 1 }

  componentDidUpdate(prevProps: ComponentProps, prevState: StateProps) {
    const { boss, checkFrame, clearResult } = this.props;
    const { step } = this.state;

    const isLensSelected = !isEmptyObject(prevProps.boss.lens);
    const isBossFrameSelected = !isEmptyObject(boss.frame);
    
    const domElement = document.querySelector('.frame-selection__scroll');
    const isStepChanged = step !== prevState.step;

    if (domElement && isStepChanged) {
      domElement.scrollTo(0, 0);
    }

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
    }
  }

  private onDialogEnter = () => {
    const { step } = this.state;

    if (step !== 1) {
      this.setState({ step: 1 });
    }
  }

  private renderSelectedFrame(frame: Frame, clearSelectedFrame: typeof framesActions.clearSelectedFrame) {
    return (
      <div className="frame-selection__frame-selected">
        <div>{frame.value}</div>
        <div>{frame.label}</div>
        <div className="-flex">
          <img className="frame-search__img" src={`./${frame.img}`} />
        </div>
        <div>{frame.compatibility ? 'true' : 'false'}</div>
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
    );
  }

  public render() {
    const { isFetching, open, selectedFrame, clearSelectedFrame, handleClose } = this.props;
    const stepSelectingFrame = this.state.step;
  
    const isFrameSelected = !isEmptyObject(selectedFrame);

    return (
      <Dialog
        className="frame-selection"
        fullScreen
        classes={{
          paperScrollPaper: 'frame-selection__scroll',
        }}
        disableBackdropClick
        onEnter={this.onDialogEnter}
        open={open}
        onClose={handleClose}
      >
        {isFetching && <CircularProgress className="frame-selection__progress" />}
        <div className="frame-selection__content yellow-section">
          {isFrameSelected && this.renderSelectedFrame(selectedFrame, clearSelectedFrame)}

          {stepSelectingFrame === 1 && <FrameSelectionFirstPage setStep={this.changeStep} handleClick={this.handleClick} />}
          {stepSelectingFrame === 2 && <FrameSelectionSecondPage setStep={this.changeStep} handleClick={this.handleClick} />}
        </div>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSelectionContainer);
