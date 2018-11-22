import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { ApplicationState } from '../store';
import { IOrderState } from '../store/order/types';
import { Groups, Field } from '../store/filter/types';
import * as filterActions from '../store/filter/actions';

// import FrameSearchTable from '../components/FrameSearchTable';

import '../styles/frameFilter.css';

type PropsFromState = {
  order: IOrderState;
  fetching: boolean;
  groups: Groups;
  errors: string;
  query: Object;
}

type PropsFromDispatch = {
  handleFetch: typeof filterActions.fetchFilterGroups,
  handleChange: typeof filterActions.changeChecked,
}

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
  fetching: state.filter.fetching,
  groups: state.filter.groups,
  errors: state.filter.errors,
  query: state.filter.query,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetch: (order: IOrderState) => dispatch(filterActions.fetchFilterGroups(order)),
  handleChange: (type: string, name: string, value: boolean) => dispatch(filterActions.changeChecked(type, name, value)),
});

class FrameSearch extends React.Component<ComponentProps> {
  state = { step: 1 };

  public componentDidMount() {
    const { handleFetch } = this.props;

    handleFetch();
  }

  private onClick = (index: number) => {
    this.setState({ step: index });
  };

  private renderGroup = (group: Field[], type: string) => {
    const { handleChange } = this.props;

    return group.map((field: Field) => (
      <FormControlLabel
        key={field.value}
        control={
          <Checkbox
            checked={field.checked}
            onChange={(evt) => handleChange(type, field.name, evt.target.checked)}
          />
        }
        label={field.name}
      />
    ));
  };

  render() {
    const { groups } = this.props;

    return (
      <div className="frame-filter__filter">
        <h2 className="frame-selection__form-title">Or use filter to find best variant</h2>
        <div className="frame-filter__filter-bar">
          <Button variant="contained" onClick={() => this.onClick(1)}>Color</Button>
          <Button variant="contained" onClick={() => this.onClick(2)}>Fit</Button>
          <Button variant="contained" onClick={() => this.onClick(3)}>Shape</Button>
          <Button variant="contained" onClick={() => this.onClick(4)}>Material</Button>
        </div>
        <div className="frame-filter__filter-groups">
          <div className={`frame-filter__filter-group ${this.state.step === 1 ? '-active' : ''}`}>
            {this.renderGroup(groups.color, 'color')}
          </div>
          <div className={`frame-filter__filter-group -flex-around ${this.state.step === 2 ? '-active' : ''}`}>
            <div className="-relative">
              <h3 className="frame-filter__filter-group-label">Width</h3>
              {this.renderGroup(groups.width, 'width')}
            </div>
            <div className="-relative">
              <h3 className="frame-filter__filter-group-label">Nose bridge</h3>
              {this.renderGroup(groups.noseBridge, 'noseBridge')}
            </div>
          </div>
          <div className={`frame-filter__filter-group ${this.state.step === 3 ? '-active' : ''}`}>
            {this.renderGroup(groups.shape, 'shape')}
          </div>
          <div className={`frame-filter__filter-group ${this.state.step === 4 ? '-active' : ''}`}>
            {this.renderGroup(groups.material, 'material')}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSearch);
