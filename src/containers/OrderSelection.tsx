import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ApplicationState } from '../store';
import { IOrderState, Errors,  Prescription, Boss } from '../store/order/types';
import { Lens } from '../store/lenses/types';
import * as orderActions from '../store/order/actions';
import * as framesActions from '../store/frames/actions';
import { isEmptyObject } from '../helpers/mathHelper';
import LinkComponent from '../components/LinkComponent';
import Section from '../components/Section';
import PrescriptionSelectionContainer from './PrescriptionSelectionContainer';
import LensSelectionContainer from './LensSelectionContainer';
import FrameSelection from './FrameSelection';
import SelectField from '../components/SelectField';

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

  public render() {
    const {
      isFetching,
      errors,
      frameErrors,
      state,
      order,
      handleOpen,
      submitOrder,
      saveOrder,
      saveFittingHeight
    } = this.props;
    const frameSelectionButtonDisabled = isEmptyObject(order.boss.lens);
    const isFrameSelected = !isEmptyObject(order.boss.frame);
    const isFittingHeightSelected = order.boss.fittingHeight ? true : false;
    const isErrors = frameErrors ? true: false;
    const submitDisabled =  !isFittingHeightSelected || isErrors;

    return (
      <main className="p-template__main">
      {isFetching && <CircularProgress className="p-template__progress"/>}
        <PrescriptionSelectionContainer />

        {isFrameSelected
          ? (
            <React.Fragment>
              <Section tittle="Enter fitting height" wrap>
                {errors.fittingHeight && <div className="order-selection__error">{errors.fittingHeight}</div>}
                <SelectField
                  disabled={isFetching}
                  className="order-selection__select"
                  label="Height"
                  value={order.boss.fittingHeight}
                  list={order.fittingProperties}
                  onChange={(value: number) => saveFittingHeight(order.boss, value)}
                />
              </Section>
              <Section className="order-selection__info s-template__content" tittle="Message">
                <p>{order.message}</p>
              </Section>
            </React.Fragment>
          )
          : (
            <Section className="order-selection__info s-template__content" tittle="Recommendation">
              <p>{order.recommendation}</p>
            </Section>
          )
        }

        <LensSelectionContainer />
        <FrameSelection />

        {isFrameSelected
          ? (
            <React.Fragment>
              <Section 
                className="order-selection__content" 
                tittle="Frame Selected" 
                errors={frameErrors}
              >
                <div className="order-selection__img-wrapper s-template__content">
                  <img className="order-selection__img" src={`/${order.boss.frame.img}`} />
                </div>
                <div className="order-selection__frame-description">
                  <p>UPC Code: {order.boss.frame.upc}</p>
                  <p>Name of Frame: {order.boss.frame.label}</p>
                </div>
                <Button 
                  className="-full-width"
                  variant="contained"
                  disabled={isFetching}
                  onClick={handleOpen}
                >
                  Edit
                </Button>
              </Section>

              <Section className="order-selection__content" tittle="36 Point Trace Dimentions">
                <div className="order-selection__img-wrapper s-template__content">
                  {order.blueprint['img'] && (
                    <img className="order-selection__img" src={`/${order.blueprint.img}`} />
                  )}
                </div>
              </Section>
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <Section className="order-selection__lens s-template__content" tittle="Selected NikonEyes Lens">
                <p>{order.boss.lens.name}</p>
              </Section>

              <Section tittle="The following frames are best suited for the patient" wrap>
                <Button 
                  variant="contained" 
                  disabled={isFetching || frameSelectionButtonDisabled} 
                  onClick={handleOpen}
                >
                  Frame Selection
                </Button>
              </Section>
            </React.Fragment>
          )
        }

        <section className="order-selection__actions">
          {errors.submit && <div className="order-selection__error">{errors.submit}</div>}
          <Button variant="contained" disabled={isFetching} onClick={() => saveOrder(state)}>Save</Button>
          {isFrameSelected && (
            <Button 
              variant="contained" 
              disabled={isFetching || submitDisabled} 
              onClick={() => submitOrder(order.boss)}
            >
              Submit Order
            </Button>
          )}
        </section>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelection);
