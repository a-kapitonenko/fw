import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { ApplicationState } from '../store';
import { Boss } from '../store/order/types';
import { Groups, Field } from '../store/filter/types';
import { Frame } from '../store/frames/types';
import * as filterActions from '../store/filter/actions';
import * as framesActions from '../store/frames/actions';

import { isEmptyObject } from '../helpers/mathHelper';
import { isEmptyQuery } from '../helpers/filterHelper';

import FrameFilter from '../components/FrameFilter';
import FrameTable from '../components/FrameTable';

type PropsFromState = {
  isFetching: boolean;
  errors: string;
  groups: Groups;
  query: Object;
  boss: Boss;
  frames: Frame[];
  selectedFrame: Frame;
}

type PropsFromDispatch = {
  fetchFrames: typeof filterActions.fetchFrames,
  changeChecked: typeof filterActions.changeChecked,
  resetChecked: typeof filterActions.resetChecked,
  addQuery: typeof filterActions.addQuery,
  deleteQuery: typeof filterActions.deleteQuery,
  resetQuery: typeof filterActions.clearQuery,
  setSelectedFrame: typeof framesActions.setSelectedFrame,
}

type ComponentProps = PropsFromState & PropsFromDispatch;

type StateProps = {
  step: number;
};

const mapStateToProps = (state: ApplicationState) => ({
  isFetching: state.filter.isFetching,
  errors: state.filter.errors,
  groups: state.filter.groups,
  query: state.filter.query,
  boss: state.order.boss,
  frames: state.filter.frames,
  selectedFrame: state.frames.selectedFrame,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchFrames: (boss: Boss, query: Object) => dispatch(filterActions.fetchFrames(boss, query)),
  changeChecked: (type: string, name: string, value: boolean) => dispatch(filterActions.changeChecked(type, name, value)),
  resetChecked: () => dispatch(filterActions.resetChecked()),
  addQuery: (type: string, value: any) => dispatch(filterActions.addQuery(type, value)),
  deleteQuery: (type: string, value: any) => dispatch(filterActions.deleteQuery(type, value)),
  resetQuery: () => dispatch(filterActions.clearQuery()),
  setSelectedFrame: (frame: Frame) => dispatch(framesActions.setSelectedFrame(frame))
});

class FrameSearchContainer extends React.Component<ComponentProps> {
  state: StateProps = { step: 1 };

  public componentDidMount() {
    const { query, boss, frames, fetchFrames } = this.props;
    const isFramesEmpty = isEmptyObject(frames);

    if (isFramesEmpty) {
      fetchFrames(boss, query);
    }
  }

  public componentDidUpdate(prevProps: ComponentProps) {
    const { query, boss, fetchFrames } = this.props;

    if (query !== prevProps.query) {
      fetchFrames(boss, query);
    }
  }

  private handleClick = (index: number) => {
    this.setState({ step: index });
  };

  private handleChange = (type: string, name: string, value: string, checked: boolean) => {
    const { changeChecked, addQuery, deleteQuery } = this.props;

    if (checked) {
      addQuery(type, value);
    } else {
      deleteQuery(type, value);
    }

    changeChecked(type, name, checked);
  }

  private renderGroup = (group: Field[], type: string, disabled: boolean) => {
    return group.map((field: Field) => (
      <FormControlLabel
        key={field.value}
        control={
          <Checkbox
            checked={field.checked}
            disabled={disabled}
            onChange={(evt) => {
              if (!disabled) {
                this.handleChange(type, field.name, field.value, evt.target.checked)
              };
            }}
          />
        }
        label={field.name}
      />
    ));
  };

  render() {
    const { isFetching, errors, groups, query, frames, selectedFrame, resetChecked, resetQuery, setSelectedFrame } = this.props;
    const disabledResetFilterButton = isEmptyQuery(query);

    return (
      <div className="frame-selection__form-section -flex-column-between">
        <FrameFilter
          disabled={isFetching}
          errors={errors}
          step={this.state.step}
          groups={groups}
          disabledButton={disabledResetFilterButton}
          renderGroup={this.renderGroup}
          handleClick={this.handleClick}
          resetFilter={() => {
            resetChecked();
            resetQuery();
          }}
        />

        <FrameTable disabled={isFetching} frames={frames} selectedFrame={selectedFrame} handleClick={setSelectedFrame} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSearchContainer);
