import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

import { ApplicationState } from '../../store';
import { Frame } from '../../store/frames/types';
import * as framesActions from '../../store/frames/actions';

import { isEmptyObject } from '../../helpers/mathHelper';

import FrameSelectionFirstPage from './FrameSelectionFirstPage';
import FrameSelectionSecondPage from './FrameSelectionSecondPage';

import '../../styles/frameSelection.css';

type PropsFromState = {
  open: boolean;
  step: number;
  selectedFrame: Frame;
};

type PropsFromDispatch = {
  resetSelectedFrame: typeof framesActions.resetSelectedFrame;
};

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  open: state.frames.open,
  step: state.frames.step,
  selectedFrame: state.frames.selectedFrame,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetSelectedFrame: () => dispatch(framesActions.resetSelectedFrame()),
});

class FrameSelectionContainer extends React.Component<ComponentProps> {
  public render() {
    const { open, step, selectedFrame, resetSelectedFrame } = this.props;
    const isFrameSelected = !isEmptyObject(selectedFrame);

    return (
      <Dialog open={open} fullScreen={true} className="frame-selection__wrapper">
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
                  onClick={resetSelectedFrame}
                >
                  <Close />
                </IconButton>
              </div>
            </div>
          )}
          {step === 1 && <FrameSelectionFirstPage />}
          {step === 2 && <FrameSelectionSecondPage />}
        </div>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSelectionContainer);
