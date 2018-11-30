import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ApplicationState } from '../store';
import { IOrderState, Prescription } from '../store/order/types';
import { Lens } from '../store/lenses/types';
import * as orderActions from '../store/order/actions';
import * as framesActions from '../store/frames/actions';
import * as filterActions from '../store/filter/actions';

import { isEmptyObject } from '../helpers/mathHelper';

import LinkComponent from '../components/LinkComponent';
import Section from '../components/Section';
import PrescriptionSelectionContainer from './PrescriptionSelectionContainer';
import LensSelectionContainer from './LensSelectionContainer';
import FrameSelection from './FrameSelectionContainer';
import SelectField from '../components/SelectField';

import '../styles/orderSelection.css';

type PropsFromState = {
  order: IOrderState;
};

type PropsFromDispatch = {
  handleOpen: typeof framesActions.open;
  fetchFilterGroups: typeof filterActions.fetchFilterGroups;
  saveFittingHeight: typeof orderActions.saveFittingHeight;
  checkCompatibility: typeof orderActions.checkCompatibility;
  fetchLensCompatibility: typeof orderActions.fetchLensCompatibility;
  saveOrder: typeof orderActions.saveOrder;
  setErrors: typeof orderActions.setErrors;
  submitOrder: typeof orderActions.submitOrder;
};

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleOpen: () => dispatch(framesActions.open()),
  fetchFilterGroups: () => dispatch(filterActions.fetchFilterGroups()),
  saveFittingHeight: (order: IOrderState, height: number) => dispatch(orderActions.saveFittingHeight(order, height)),
  checkCompatibility: (order: IOrderState) => dispatch(orderActions.checkCompatibility(order)),
  fetchLensCompatibility: (prescription: Prescription, lens: Lens) => dispatch(orderActions.fetchLensCompatibility(prescription, lens)),
  saveOrder: (order: IOrderState) => dispatch(orderActions.saveOrder(order)),
  setErrors: (type: string, error: string) => dispatch(orderActions.setErrors(type, error)),
  submitOrder: (order: IOrderState) => dispatch(orderActions.submitOrder(order)),
});

class OrderSelection extends LinkComponent<ComponentProps> {
  public componentDidMount() {
    const { fetchFilterGroups } = this.props;

    fetchFilterGroups();
  }

  public componentDidUpdate(prevProps: ComponentProps) {
    const { order, checkCompatibility, fetchLensCompatibility } = this.props;
    const isFrameSelected = !isEmptyObject(order.boss.frame);
    const isLensSelected = !isEmptyObject(order.boss.lens);
    const isBarcode = !isEmptyObject(order.boss.barcode);

    if (prevProps.order.boss.lens !== order.boss.lens && isFrameSelected) {
      checkCompatibility(order);
    }

    if (prevProps.order.boss.prescription !== order.boss.prescription && isLensSelected) {
      fetchLensCompatibility(order.boss.prescription, order.boss.lens);
    }

    if (isBarcode) {
      this.redirectToPage('/order');
    }
  }

  public render() {
    const { order, handleOpen, saveFittingHeight, saveOrder, submitOrder } = this.props;
    const frameSelectionButtonDisabled = isEmptyObject(order.boss.lens);
    const isFrameSelected = isEmptyObject(order.boss.frame);
    const isFittingHeightSelected = order.boss.fittingHeight ? true : false;
    const submitDisabled = !isEmptyObject(order.errors) || !isFittingHeightSelected

    return (
      <div className="page__content">
      {order.isFetching && <CircularProgress className="page__progress"/>}
        <PrescriptionSelectionContainer />

        {!isFrameSelected
          ? (
            <React.Fragment>
              <Section className="order-selection__recommend" tittle="Enter fitting height" wrap>
                <SelectField
                  className="order-selection__select"
                  label="Height"
                  value={order.boss.fittingHeight}
                  list={order.fittingProperties}
                  onChange={(value: number) => saveFittingHeight(order, value)}
                />
              </Section>
              <Section className="order-selection__recommend" tittle="Message">
                <p>{order.message}</p>
              </Section>
            </React.Fragment>
          )
          : (
            <Section className="order-selection__recommend" tittle="Recommendation">
              <p>{order.recommendation}</p>
            </Section>
          )
        }

        <LensSelectionContainer />
        <FrameSelection />

        {!isFrameSelected
          ? (
            <React.Fragment>
              <Section className="order-selection__content" tittle="Frame Selected">
                <div className="order-selection__img-wrapper">
                  <img className="order-selection__frame-img" src={`/${order.boss.frame.img}`} />
                </div>
                {order.errors['frame'] && <div className="order-selection__frame-error">{order.errors['frame']}</div>}
                <div className="order-selection__frame-description">
                  <p>UPC Code: {order.boss.frame.upc}</p>
                  <p>Name of Frame: {order.boss.frame.label}</p>
                </div>
                <Button className="-full-width" variant="contained" onClick={handleOpen}>Edit</Button>
              </Section>

              <Section className="order-selection__content" tittle="36 Point Trace Dimentions">
                <div className="order-selection__img-wrapper">
                  {order.blueprint['img'] && <img className="order-selection__frame-img" src={`/${order.blueprint.img}`} />}
                </div>
              </Section>
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <Section className="order-selection__field" tittle="Selected NikonEyes Lens">
                <p>{order.boss.lens.name}</p>
              </Section>

              <Section tittle="The following frames are best suited for the patient" wrap>
                <Button variant="contained" disabled={frameSelectionButtonDisabled} onClick={handleOpen}>
                  Frame Selection
                </Button>
              </Section>
            </React.Fragment>
          )
        }

        <section className="order-selection__actions">
          <Button variant="contained" onClick={saveOrder}>Save</Button>
          {!isFrameSelected && (
            <Button variant="contained" disabled={submitDisabled} onClick={() => submitOrder(order)}>
              Submit Order
            </Button>
          )}
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelection);
