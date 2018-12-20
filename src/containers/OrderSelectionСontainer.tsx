import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { ApplicationState } from '../store';
import { IOrderState, Errors, Prescription, Boss } from '../store/order/types';
import { Lens } from '../store/lenses/types';
import * as orderActions from '../store/order/actions';
import * as framesActions from '../store/frames/actions';
import { isEmptyObject } from '../helpers/mathHelper';
import LinkComponent from '../components/LinkComponent';

import PreliminaryOrderSelection from '../components/PreliminaryOrderSelection';
import FinalOrderSelection from '../components/FinalOrderSelection';

import '../styles/orderSelection.css';

type PropsFromState = {
  isFetching: boolean;
  state: ApplicationState;
  errors: Errors;
  frameErrors: string;
  order: IOrderState;
  selectedLens: Lens;
  prescription: Prescription;
};

type PropsFromDispatch = {
  handleOpen: typeof framesActions.open;
  submitOrder: typeof orderActions.submitStart;
  saveOrder: typeof orderActions.saveOrderStart;
  saveFittingHeight: typeof orderActions.saveFittingHeightStart;
};

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  isFetching: state.order.isFetching || state.lenses.isFetching || state.frames.isFetching,
  state: state,
  errors: state.order.errors,
  frameErrors: state.frames.errors,
  order: state.order,
  selectedLens: state.order.boss.lens,
  prescription: state.order.boss.prescription,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleOpen: () => dispatch(framesActions.open()),
  submitOrder: (boss: Boss) => dispatch(orderActions.submitStart(boss)),
  saveOrder: (state: ApplicationState) => dispatch(orderActions.saveOrderStart(state)),
  saveFittingHeight: (boss: Boss, height: number) => dispatch(orderActions.saveFittingHeightStart(boss, height)),
});

class OrderSelection extends LinkComponent<ComponentProps> {
  public componentDidUpdate(prevProps: ComponentProps) {
    const { order } = this.props;

    if (order.redirect) {
      this.redirectToPage('/order');
    }
  }

  private renderActions() {
    const { isFetching, errors, frameErrors, state, order, saveOrder, submitOrder } = this.props;

    const isFrameSelected = !isEmptyObject(order.boss.frame);
    const isErrors = frameErrors ? true : false;
    const isFittingHeightSelected = order.boss.fittingHeight ? true : false;
    const submitDisabled = !isFittingHeightSelected || isErrors;

    return (
      <section className="order-selection__actions">
        {errors.submit && <div className="order-selection__error">{errors.submit}</div>}
        <Button variant="contained" disabled={isFetching} onClick={() => saveOrder(state)}>Save</Button>
        {isFrameSelected && (
          <Button
            variant="contained"
            disabled={submitDisabled}
            onClick={() => submitOrder(order.boss)}
          >
            Submit Order
          </Button>
        )}
      </section>
    );
  }

  public render() {
    const { isFetching, errors, frameErrors, order, handleOpen, saveFittingHeight } = this.props;
    const frameSelectionButtonDisabled = isEmptyObject(order.boss.lens);
    const isFrameSelected = !isEmptyObject(order.boss.frame);

    return (
      <React.Fragment>
        {isFrameSelected
          ? (
            <FinalOrderSelection
              isFetching={isFetching}
              fittingHeightErrors={errors.fittingHeight}
              frameErrors={frameErrors}
              boss={order.boss}
              blueprint={order.blueprint}
              fittingProperties={order.fittingProperties}
              message={order.message}
              renderActions={this.renderActions}
              handleOpen={handleOpen}
              saveFittingHeight={saveFittingHeight}
            />
          )
          : (
            <PreliminaryOrderSelection
              isFetching={isFetching}
              buttonDisabled={frameSelectionButtonDisabled}
              lens={order.boss.lens}
              recommendation={order.recommendation}
              renderActions={this.renderActions}
              handleOpen={handleOpen}
            />
          )
        }
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelection);
