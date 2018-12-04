import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { ApplicationState } from '../../store';
import { Frame } from '../../store/frames/types';
import * as framesActions from '../../store/frames/actions';

import { isEmptyObject } from '../../helpers/mathHelper';

import FrameSearchContainer from './FrameSearchContainer';
import FrameFilterContainer from './FrameFilterContainer';
import FrameSearchTable from '../../components/FrameSearchTable';
import FrameTable from '../../components/FrameTable';

import '../../styles/frameSelection.css';

type PropsFromState = {
  filterFetching: boolean;
  selectedFrame: Frame;
  searchFrames: Frame[];
  filterFrames: Frame[];
};

type PropsFromDispatch = {
  setStep: typeof framesActions.setStep;
  setSelectedFrame: typeof framesActions.setSelectedFrame;
  resetSelectedFrame: typeof framesActions.resetSelectedFrame;
  handleClose: typeof framesActions.close;
};

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  filterFetching: state.filter.isFetching,
  selectedFrame: state.frames.selectedFrame,
  searchFrames: state.search.selectedFrames,
  filterFrames: state.filter.frames,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setStep: (step: number) => dispatch(framesActions.setStep(step)),
  setSelectedFrame: (frame: Frame) => dispatch(framesActions.setSelectedFrame(frame)),
  resetSelectedFrame: () => dispatch(framesActions.resetSelectedFrame()),
  handleClose: () => dispatch(framesActions.close()),
});

class FrameSelectionFirstPage extends React.Component<ComponentProps> {
  private handleClick = (frame: Frame) => {
    const { selectedFrame, setSelectedFrame, resetSelectedFrame } = this.props;
    if (frame.compatibility) {
      if (selectedFrame === frame) {
        resetSelectedFrame();
      } else {
        setSelectedFrame(frame);
      }
    } else {
    }
  }

  public render() {
    const { filterFetching, selectedFrame, searchFrames, filterFrames, setStep, handleClose } = this.props;
    const buttonDisabled = isEmptyObject(selectedFrame);

    return (
      <React.Fragment>
        <h1 className="frame-selection__title">Tailored Frame Selection</h1>
        <section className="frame-selection__form">
          <div className="frame-selection__form-content">
            <div className="frame-selection__form-section -flex-column-between">
              <FrameSearchContainer />
              <FrameSearchTable frames={searchFrames} selectedFrame={selectedFrame} handleClick={this.handleClick} />
            </div>
            <div className="frame-selection__form-section -flex-column-between">
              <FrameFilterContainer />
              <FrameTable disabled={filterFetching} frames={filterFrames} selectedFrame={selectedFrame} handleClick={this.handleClick} />
            </div>
          </div>
          <section className="frame-selection__form-actions">
            <Button className="frame-selection__form-button" variant="contained" onClick={handleClose}>Back</Button>
            <Button className="frame-selection__form-button" variant="contained" disabled={buttonDisabled} onClick={() => setStep(2)}>Next</Button>
          </section>
        </section>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSelectionFirstPage);
