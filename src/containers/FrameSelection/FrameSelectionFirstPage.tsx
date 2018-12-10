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

type OwnProps = {
  setStep: (step: number) => void;
  handleClick: (frame: Frame) => void;
};

type PropsFromState = {
  filterFetching: boolean;
  selectedFrame: Frame;
  searchFrames: Frame[];
  filterFrames: Frame[];
};

type MergeProps = OwnProps & PropsFromState;

type PropsFromDispatch = {
  handleClose: typeof framesActions.close;
};

type ComponentProps = MergeProps & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState, ownProps: OwnProps) => ({
  filterFetching: state.filter.isFetching,
  selectedFrame: state.frames.selectedFrame,
  searchFrames: state.search.selectedFrames,
  filterFrames: state.filter.frames,
  setStep: ownProps.setStep,
  handleClose: ownProps.handleClick,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleClose: () => dispatch(framesActions.close()),
});

class FrameSelectionFirstPage extends React.Component<ComponentProps> {
  public render() {
    const { filterFetching, selectedFrame, searchFrames, filterFrames, setStep, handleClick, handleClose } = this.props;
    const buttonDisabled = isEmptyObject(selectedFrame);

    return (
      <React.Fragment>
        <h1 className="p-template__tittle">Tailored Frame Selection</h1>
        <section className="frame-selection__form">
          <div className="frame-selection__form-content">
            <div className="frame-selection__form-section -flex-column-between">
              <FrameSearchContainer />
              <FrameSearchTable frames={searchFrames} selectedFrame={selectedFrame} handleClick={handleClick} />
            </div>
            <div className="frame-selection__form-section -flex-column-between">
              <FrameFilterContainer />
              <FrameTable isFetching={filterFetching} frames={filterFrames} selectedFrame={selectedFrame} handleClick={handleClick} />
            </div>
          </div>
          <section className="frame-selection__form-actions">
            <Button className="frame-selection__form-button" variant="contained" onClick={handleClose}>Close</Button>
            <Button className="frame-selection__form-button" variant="contained" disabled={buttonDisabled} onClick={() => setStep(2)}>Next</Button>
          </section>
        </section>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSelectionFirstPage);
