import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Select from 'react-select';
import Button from '@material-ui/core/Button';

import * as framesActions from '../store/frames/actions';
import { Frame, SelectedFrame } from '../store/frames/types';
import { IOrderState } from '../store/order/types';
import { ApplicationState } from '../store';

// import { createSelectedList, createSelectedFrameData } from '../helpers/frameSelectionHelper';

// import FrameTable from '../components/FrameTable';
import FrameSearch from './FrameSearch';


import '../styles/frameSelection.css';

interface PropsFromState {
  order: IOrderState;
  list: Frame[];
  selected: SelectedFrame[];
  selectedFrame: Frame;
}

interface PropsFromDispatch {
  handleFetch: typeof framesActions.fetchFrames;
  addSelected: typeof framesActions.addSelected;
  deleteSelected: typeof framesActions.deleteSelected;
  handleClick: typeof framesActions.setSelectedFrame;
  handleCheck: typeof framesActions.fetchCheck;
}

type AllProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
  list: state.frames.list,
  selected: state.frames.selected,
  selectedFrame: state.frames.selectedFrame,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetch: (order: IOrderState) => dispatch(framesActions.fetchFrames(order)),
  addSelected: (frame: SelectedFrame) => dispatch(framesActions.addSelected(frame)),
  deleteSelected: (frame: SelectedFrame) => dispatch(framesActions.deleteSelected(frame)),
  handleClick: (frame: Frame) => dispatch(framesActions.setSelectedFrame(frame)),
  handleCheck: (frames: SelectedFrame[]) => dispatch(framesActions.fetchCheck(frames)),
});

class FrameSelectionContainer extends React.Component<AllProps> {
  componentDidMount() {
    const { order, handleFetch } = this.props;

    handleFetch(order);
  }

  // private handleSelect = (selectedValue: any) => {
  //   const { selected } = this.props;
  //   if (selectedValue.length === 0 || selected.length >= 5) {
  //     return;
  //   }

  //   const { list, addSelected } = this.props;
  //   const frame = list.find((item: Frame) => item.upc === selectedValue.value);
  //   const selectedFrame: SelectedFrame = createSelectedFrameData(frame);

  //   addSelected(selectedFrame);
  // }

  render() {
    // const { list, selected, selectedFrame, handleClick, handleCheck } = this.props;
    // const selectedList = createSelectedList(list, selected);

    return (
      <div>
        <h1 className="page__title">Tailored Frame Selection</h1>
        <section className="frame-selection__form">
          <h2 className="frame-selection__form-title">Please enter up to five frame UPC's to check for compatibility and select the one that best suits the patient</h2>
          <FrameSearch />          
          {/* <Select className="frame-selection__form-input" options={selectedList} onChange={this.handleSelect} />
          
          <FrameTable list={selected} selectedFrame={selectedFrame} handleClick={handleClick} />

          <Button className="frame-selection__form-button" variant="contained" onClick={() => handleCheck(selected)}>Check Frames</Button> */}

          <section className="frame-selection__form-actions">
            <Link to="/">
              <Button className="frame-selection__form-button" variant="contained">Back</Button>
            </Link>
            <Link to="/select-frame/favorite/">
              <Button className="frame-selection__form-button" variant="contained">Next</Button>
            </Link>
          </section>
        </section>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSelectionContainer);
