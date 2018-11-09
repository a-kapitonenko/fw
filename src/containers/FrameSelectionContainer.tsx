import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import Button from '@material-ui/core/Button';

import * as framesActions from '../store/frames/actions';
import { Frame, SelectedFrame } from '../store/frames/types';
import { ApplicationState } from '../store';

import FrameTable from '../components/FrameTable';

import { createSelectedList, createSelectedFrameData } from '../helpers/frameSelectionHelper';

import '../styles/frameSelection.css';

interface PropsFromState {
  list: Frame[];
  selected: SelectedFrame[];
}

interface PropsFromDispatch {
  handleFetch: typeof framesActions.fetchFrames;
  addSelected: typeof framesActions.addSelected;
  deleteSelected: typeof framesActions.deleteSelected;
  handleCheck: typeof framesActions.fetchCheck;
}

type AllProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  list: state.frames.list,
  selected: state.frames.selected,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetch: () => dispatch(framesActions.fetchFrames()),
  addSelected: (frame: SelectedFrame) => dispatch(framesActions.addSelected(frame)),
  deleteSelected: (frame: SelectedFrame) => dispatch(framesActions.deleteSelected(frame)),
  handleCheck: (frames: SelectedFrame[]) => dispatch(framesActions.fetchCheck(frames)),
});

class FrameSelectionContainer extends React.Component<AllProps> {
  componentDidMount() {
    const { handleFetch } = this.props;

    handleFetch();
  }

  private handleSelect = (selectedValue: any) => {
    if (selectedValue.length === 0) {
      return;
    }

    const { list, addSelected } = this.props;
    const frame = list.find((item: Frame) => item.upc === selectedValue.value);
    const selectedFrame: SelectedFrame  = createSelectedFrameData(frame);

    addSelected(selectedFrame);
  }

  render() {
    const { list, selected, handleCheck } = this.props;
    const selectedList = createSelectedList(list, selected);

    return (
      <div className="page__wrapper yellow-section">
        <div className="main-content">
          <h1 className="page__title">Tailored Frame Selection</h1>

          <section className="frame-selection__form">
            <h2 className="frame-selection__form-title">Please enter up to five frame UPC's to check for compatibility and select the one that best suits the patient</h2>
            <Select className="frame-selection__form-input" options={selectedList} onChange={this.handleSelect} />
          </section>

          <section>
            <FrameTable list={selected} />
            <Button className="frame-selection__form-button" variant="contained" onClick={() => handleCheck(selected)}>Check Frames</Button>
          </section>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSelectionContainer)
