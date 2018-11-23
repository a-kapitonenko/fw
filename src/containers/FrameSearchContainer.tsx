import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ApplicationState } from '../store';
import { IOrderState } from '../store/order/types';
import { Frame } from '../store/frames/types';
import * as searchActions from '../store/search/actions';

import FrameSearch from '../components/FrameSearch';

import '../styles/frameSearch.css';

type PropsFromState = {
  order: IOrderState;
  fetching: boolean;
  errors: string;
  frames: Frame[];
  selectedFrames: Frame[];
}

type PropsFromDispatch = {
  handleFetch: typeof searchActions.fetchFrames,
  setSelectedFrames: typeof searchActions.setSelectedFrames,
}

type ComponentProps = PropsFromState & PropsFromDispatch;

type StateProps = {
  open: boolean;
  query: string;
}

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
  fetching: state.search.fetching,
  errors: state.search.errors,
  frames: state.search.frames,
  selectedFrames: state.search.selectedFrames,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetch: (order: IOrderState, upc: string) => dispatch(searchActions.fetchFrames(order, upc)),
  setSelectedFrames: (frames: Frame[]) => dispatch(searchActions.setSelectedFrames(frames)),
});

class FrameSearchContainer extends React.Component<ComponentProps> {
  state: StateProps = { open: false, query: '' };

  private onChange = (props: Frame[]) => {
    const { setSelectedFrames } = this.props;
    
    setSelectedFrames(props);

    return props;
  }

  private onBlur = (props: any)=> {
    if (this.state.open) {
      this.setState({ open: false })
    }
  }

  private onInputChange = (props: string) => {
    const { order, handleFetch } = this.props;

    if (props.length === 3) {
      handleFetch(order, props);

      this.setState({ open: true });
    } else if (props.length < 3 && this.state.open) {
      this.setState({ open: false });
    }

    return props;
  }

  public render() {
    const { fetching, frames, selectedFrames } = this.props;

    return (
      <FrameSearch 
        fetching={fetching} 
        open={this.state.open} 
        list={frames}
        selectedFrames={selectedFrames}
        onInputChange={this.onInputChange}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSearchContainer);
