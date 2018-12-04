import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { ApplicationState } from '../../store';
import { Boss } from '../../store/order/types';
import { Groups, Field } from '../../store/filter/types';
import { Frame } from '../../store/frames/types';
import * as filterActions from '../../store/filter/actions';

import { isEmptyObject } from '../../helpers/mathHelper';
import { isEmptyQuery } from '../../helpers/filterHelper';

import FrameFilter from '../../components/FrameFilter';

type PropsFromState = {
  isFetching: boolean;
  errors: string;
  groups: Groups;
  query: Object;
  boss: Boss;
  frames: Frame[];
}

type PropsFromDispatch = {
  fetchFrames: typeof filterActions.fetchFrames,
  clearErrors: typeof filterActions.clearErrors,
  changeChecked: typeof filterActions.changeChecked,
  resetChecked: typeof filterActions.resetChecked,
  addQuery: typeof filterActions.addQuery,
  deleteQuery: typeof filterActions.deleteQuery,
  resetQuery: typeof filterActions.clearQuery,
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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchFrames: (boss: Boss, query: Object) => dispatch(filterActions.fetchFrames(boss, query)),
  clearErrors: () => dispatch(filterActions.clearErrors()),
  changeChecked: (type: string, name: string, value: boolean) => dispatch(filterActions.changeChecked(type, name, value)),
  resetChecked: () => dispatch(filterActions.resetChecked()),
  addQuery: (type: string, value: any) => dispatch(filterActions.addQuery(type, value)),
  deleteQuery: (type: string, value: any) => dispatch(filterActions.deleteQuery(type, value)),
  resetQuery: () => dispatch(filterActions.clearQuery()),
});

class FrameSearchContainer extends React.Component<ComponentProps> {
  state: StateProps = { step: 1 };

  public componentDidMount() {
    const { query, boss, frames, fetchFrames } = this.props;
    const isEmptyFrames = isEmptyObject(frames);

    if (isEmptyFrames) {
      fetchFrames(boss, query);
    }
  }

  public componentDidUpdate(prevProps: ComponentProps) {
    const { errors, query, boss, fetchFrames, clearErrors } = this.props;

    if (query !== prevProps.query) {
      if (errors) {
        clearErrors();
      }

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
    const { isFetching, errors, groups, query, resetChecked, resetQuery } = this.props;
    const disabledResetFilterButton = isEmptyQuery(query);

    return (
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
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSearchContainer);
