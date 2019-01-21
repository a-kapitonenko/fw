import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { Boss } from '../../store/order/types';
import { Frame } from '../../store/frames/types';
import * as searchActions from '../../store/search/actions';
import { frameSearchConfig } from '../../constants/frameSearch';
import FrameSearch from '../../components/FrameSearch';

type PropsFromState = {
  isFetching: boolean;
  errors: string;
  boss: Boss;
  frames: Frame[];
  selectedFrames: Frame[];
};

type PropsFromDispatch = {
  searchFrames: typeof searchActions.searchStart,
  setSelectedFrames: typeof searchActions.setSelectedFrames,
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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  searchFrames: (boss: Boss, upc: string) => dispatch(searchActions.searchStart(boss, upc)),
  setSelectedFrames: (frames: Frame[]) => dispatch(searchActions.setSelectedFrames(frames)),
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
    const { boss, searchFrames } = this.props;
    const { query } = this.state;
    const isSearchStart = props.length === frameSearchConfig.queryLength;
    const isSearchEnd = props.length < frameSearchConfig.queryLength && this.state.open;

    if (isSearchStart) {
      const isSearchNeed = query.length === 0 || query.indexOf(props);

      if (isSearchNeed) {
        searchFrames(boss, props);

        this.setState({ query: props });
      }

      this.setState({ open: true });
    } else if (isSearchEnd) {
      this.setState({ open: false });
    }

    return props;
  }

  public render() {
    const { isFetching, errors, frames, selectedFrames } = this.props;
    const { open } = this.state;

    return (
      <FrameSearch
        isFetching={isFetching}
        errors={errors}
        open={open}
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
