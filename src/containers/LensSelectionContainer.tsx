import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as LensesActions from '../store/lenses/actions';
import { setLens } from '../store/order/actions';
import { Lens } from '../store/lenses/types';
import { OrderState } from '../store/order/types';
import { ApplicationState } from '../store';

import '../styles/lensSelection.css';

interface PropsFromState {
  order: OrderState;
  list: Lens[];
  errors: string;
}

interface PropsFromDispatch {
  handleFetch: typeof LensesActions.fetchLenses;
  handleClick: typeof setLens;
}

type AllProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
  list: state.lenses.list,
  errors: state.lenses.errors,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetch: (order: OrderState) => dispatch(LensesActions.fetchLenses(order)),
  handleClick: (lens: Lens) => dispatch(setLens(lens))
});

class LensSelectionContainer extends React.Component<AllProps> {
  componentDidUpdate(prevProps: AllProps) {
    const { order, handleFetch } = this.props;

    if (order.prescription !== prevProps.order.prescription) {
      handleFetch(order);
    }
  }

  render() {
    const { list, handleClick } = this.props;
    return (
      <section className="lens-selection__section">
        {list.map((lens: Lens) => (
          <div key={lens.value} className="lens-selection__article" onClick={() => handleClick(lens)}>{lens.name}</div>
        ))}
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LensSelectionContainer);
