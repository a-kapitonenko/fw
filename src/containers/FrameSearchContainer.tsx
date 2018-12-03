import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ApplicationState } from '../store';
import { Boss } from '../store/order/types';
import { Frame } from '../store/frames/types';
import * as searchActions from '../store/search/actions';
import * as framesActions from '../store/frames/actions';

import { frameSearchConfig } from '../constants/frameSearch';

import FrameSearch from '../components/FrameSearch';
import FrameSearchTable from '../components/FrameSearchTable';

type PropsFromState = {
  isFetching: boolean;
  errors: string;
  boss: Boss;
  frames: Frame[];
  selectedFrames: Frame[];
  selectedFrame: Frame;
};

type PropsFromDispatch = {
  fetchFrames: typeof searchActions.fetchFrames,
  setSelectedFrames: typeof searchActions.setSelectedFrames,
  setSelectedFrame: typeof framesActions.setSelectedFrame,
};

type ComponentProps = PropsFromState & PropsFromDispatch;

type StateProps = {
  open: boolean;
  query: string;
};

const mapStateToProps = (state: ApplicationState) => ({
  isFetching: state.search.isFetching,
  errors: state.search.errors,
  boss: state.order.boss,
  frames: state.search.frames,
  selectedFrames: state.search.selectedFrames,
  selectedFrame: state.frames.selectedFrame,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchFrames: (boss: Boss, upc: string) => dispatch(searchActions.fetchFrames(boss, upc)),
  setSelectedFrames: (frames: Frame[]) => dispatch(searchActions.setSelectedFrames(frames)),
  setSelectedFrame: (frame: Frame) => dispatch(framesActions.setSelectedFrame(frame)),
});

class FrameSearchContainer extends React.Component<ComponentProps> {
  state: StateProps = { open: false, query: '' };

  private onChange = (props: Frame[]) => {
    const { setSelectedFrames } = this.props;

    setSelectedFrames(props);

    return props;
  }

  private onBlur = (props: React.FocusEvent<HTMLElement>) => {
    const { open } = this.state;

    if (open) {
      this.setState({ open: false })
    }
  }

  private onInputChange = (props: string) => {
    const { boss, fetchFrames } = this.props;
    const { query } = this.state;

    if (props.length === frameSearchConfig.queryLength) {
      if (query.length === 0 || query.indexOf(props)) {
        fetchFrames(boss, props);

        this.setState({ query: props });
      }

      this.setState({ open: true });
    } else if (props.length < frameSearchConfig.queryLength && this.state.open) {
      this.setState({ open: false });
    }

    return props;
  }

  public render() {
    const { isFetching, frames, selectedFrames, selectedFrame, setSelectedFrame } = this.props;
    const { open } = this.state;

    return (
      <div className="frame-selection__form-section -flex-column-between">
        <FrameSearch
          fetching={isFetching}
          open={open}
          list={frames}
          selectedFrames={selectedFrames}
          onInputChange={this.onInputChange}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
        
        <FrameSearchTable frames={frames} selectedFrame={selectedFrame} handleClick={setSelectedFrame} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSearchContainer);
