import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Select, { components } from 'react-select';

import { ApplicationState } from '../store';
import { IOrderState } from '../store/order/types';
import { Frame } from '../store/frames/types';
import * as framesActions from '../store/frames/actions';

import FrameSearchTable from '../components/FrameSearchTable';

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

type StateProps = {
  open: boolean;
  query: string;
}

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

const NoOptionsMessage = (props: any) => {
  return (
    <div>
      <components.NoOptionsMessage {...props} />
    </div>
  );
};

const Option = (props: any) => {
  return (
    <div className="frame-search__option">
      <components.Option {...props}>
        <div>{props.value}</div>
        <div>{props.label}</div>
        <img className="frame-search__img" src={`/${props.data.img}`}/>
        <div>{props.data.compatibility ? 'true' : 'false'}</div>
      </components.Option>
    </div>
  );
};

const Menu = (props: any) => {
  return <components.Menu {...props} />
}

const DropdownIndicator = (props: any) => {
  return components.DropdownIndicator && (
    <div />
  );
};

const IndicatorSeparator = ({ innerProps }: any) => {
  return (
    <span />
  );
};

class FrameSearch extends React.Component<ComponentProps> {
  state: StateProps = { open: false, query: '' };

  private onChange = (props: any) => {
    const { setSelected } = this.props;
    
    setSelected(props);

    return props;
  }

  private onBlur = (a: any)=> {
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

  render() {
    const { list, selectedFrames, selectedFrame, setSelectedFrame, fetching } = this.props;

    return (
      <div>
        <Select
          defaultValue={selectedFrames}
          className="frame-search__search"
          menuIsOpen={this.state.open}
          isLoading={fetching}
          openMenuOnClick={false}
          isMulti
          onChange={this.onChange}
          onBlur={this.onBlur}
          components={{ Menu, Option, IndicatorSeparator, DropdownIndicator, NoOptionsMessage }}
          options={list}
          onInputChange={this.onInputChange}
        />

        <FrameSearchTable list={selectedFrames} selectedFrame={selectedFrame} handleClick={setSelectedFrame} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSearch);
