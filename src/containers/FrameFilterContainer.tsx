import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { ApplicationState } from '../store';
import { IOrderState } from '../store/order/types';
import { Groups, Field } from '../store/filter/types';
import { Frame } from '../store/frames/types';
import * as filterActions from '../store/filter/actions';

import { isEmptyQuery } from '../helpers/filterHelper'; 

import FrameFilter from '../components/FrameFilter';

type PropsFromState = {
  order: IOrderState;
  fetching: boolean;
  errors: string;
  groups: Groups;
  query: Object;
  frames: Frame[];
}

type PropsFromDispatch = {
  handleFetch: typeof filterActions.fetchFilterGroups,
  fetchFrames: typeof filterActions.fetchFrames,
  changeChecked: typeof filterActions.changeChecked,
  addQuery: typeof filterActions.addQuery,
  deleteQuery: typeof filterActions.deleteQuery,
  resetQuery: typeof filterActions.resetQuery,
}

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
  fetching: state.filter.fetching,
  errors: state.filter.errors,
  groups: state.filter.groups,
  query: state.filter.query,
  frames: state.filter.frames,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetch: (order: IOrderState) => dispatch(filterActions.fetchFilterGroups(order)),
  fetchFrames: (order: IOrderState, query: Object) => dispatch(filterActions.fetchFrames(order, query)),
  changeChecked: (type: string, name: string, value: boolean) => dispatch(filterActions.changeChecked(type, name, value)),
  addQuery: (type: string, value: any) => dispatch(filterActions.addQuery(type, value)),
  deleteQuery: (type: string, value: any) => dispatch(filterActions.deleteQuery(type, value)),
  resetQuery: () => dispatch(filterActions.resetQuery()),
});

class FrameSearchContainer extends React.Component<ComponentProps> {
  state = { step: 1 };

  public componentDidMount() {
    const { handleFetch } = this.props;

    handleFetch();
  }

  public componentDidUpdate(prevProps: ComponentProps) {
    const { order, query, fetchFrames } = this.props;

    if (query !== prevProps.query) {
      fetchFrames(order, query);
    } 
  }

  private handleClick = (index: number) => {
    this.setState({ step: index });
  };

  private handleChange = (type: string, name: string, value: string, checked: boolean) => {
    const { addQuery, deleteQuery, changeChecked } = this.props;

    if (checked) {
      addQuery(type, value);
    } else {
      deleteQuery(type, value);
    }

    changeChecked(type, name, checked);
  }

  private renderGroup = (group: Field[], type: string) => {
    return group.map((field: Field) => (
      <FormControlLabel
        key={field.value}
        control={
          <Checkbox
            checked={field.checked}
            onChange={(evt) => this.handleChange(type, field.name, field.value, evt.target.checked)}
          />
        }
        label={field.name}
      />
    ));
  };

  render() {
    const { groups, query, resetQuery } = this.props;
    const disabledResetFilterButton = isEmptyQuery(query);

    return (
      <FrameFilter 
        step={this.state.step} 
        groups={groups}
        disabled={disabledResetFilterButton}
        renderGroup={this.renderGroup} 
        handleClick={this.handleClick}
        resetQuery={resetQuery}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSearchContainer);
