import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { ApplicationState } from '../store';
import { IOrderState } from '../store/order/types';
import { Frame } from '../store/frames/types';
import * as framesActions from '../store/frames/actions';

// import FrameSearchTable from '../components/FrameSearchTable';

import '../styles/frameSearch.css';

type PropsFromState = {
  order: IOrderState;
  fetching: boolean;
  list: Frame[];
  errors: string;
  selectedFrames: Frame[];
  selectedFrame: Frame;
}

type PropsFromDispatch = {
  handleFetch: typeof framesActions.fetchFramesByUPC,
  setSelected: typeof framesActions.setUpcSelected,
  setSelectedFrame: typeof framesActions.setUpcSelectedFrame,
}

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
  fetching: state.frames.UPCSearch.fetching,
  list: state.frames.UPCSearch.list,
  errors: state.frames.UPCSearch.errors,
  selectedFrames: state.frames.UPCSearch.selectedFrames,
  selectedFrame: state.frames.UPCSearch.selectedFrame,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetch: (order: IOrderState, upc: string) => dispatch(framesActions.fetchFramesByUPC(order, upc)),
  setSelected: (frames: Frame[]) => dispatch(framesActions.setUpcSelected(frames)),
  setSelectedFrame: (frame: Frame) => dispatch(framesActions.setUpcSelectedFrame(frame)),
});

class FrameSearch extends React.Component<ComponentProps> {
  state = { step: 1 };

  private onClick = (index: number) => {
    this.setState({ step: index });
  }

  render() {
    // const { selectedFrames, selectedFrame, setSelectedFrame } = this.props;

    return (
      <div style={{flex: 1}}>
        <Button variant="contained" onClick={() => this.onClick(1)}>Back</Button>
        <Button variant="contained" onClick={() => this.onClick(2)}>Back</Button>
        <Button variant="contained" onClick={() => this.onClick(3)}>Back</Button>
        <Button variant="contained" onClick={() => this.onClick(4)}>Back</Button>
        <div style={{ flex: 1 }}>
          <ul className={`qqq ${this.state.step === 1 ? '-active' : ''}`}>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
          <ul className={`qqq ${this.state.step === 2 ? '-active' : ''}`}>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
            <li>aaaaa</li>
          </ul>
          <ul className={`qqq ${this.state.step === 3 ? '-active' : ''}`}>
            <li>bbbbbb</li>
            <li>bbbbbb</li>
            <li>bbbbbb</li>
            <li>bbbbbb</li>
          </ul>

          <ul className={`qqq ${this.state.step === 4 ? '-active' : ''}`}>
            <li>1cccccc</li>
            <li>2cccccccc</li>
            <li>3cccccc</li>
            <li>4cccccc</li>
          </ul>

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSearch);
