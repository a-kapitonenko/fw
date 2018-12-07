import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ApplicationState } from '../store';
import { IOrderState, Prescription, Boss } from '../store/order/types';
import { Lens } from '../store/lenses/types';
import * as orderActions from '../store/order/actions';
import * as framesActions from '../store/frames/actions';
import * as filterActions from '../store/filter/actions';

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
  order: IOrderState;
  selectedLens: Lens;
  prescription: Prescription;
};

type PropsFromDispatch = {
  handleOpen: typeof framesActions.open;
  submitOrder: typeof orderActions.submitStart;
  saveOrder: typeof orderActions.saveOrderStart;
  fetchFilterGroups: typeof filterActions.fetchGroupsStart;
  saveFittingHeight: typeof orderActions.saveFittingHeightStart;
  // checkCompatibility: typeof orderActions.checkCompatibility;
  // fetchLensCompatibility: typeof orderActions.fetchLensCompatibility;
  // setErrors: typeof orderActions.setErrors;
};

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  isFetching: state.order.isFetching || state.lenses.isFetching,
  state: state,
  order: state.order,
  selectedLens: state.order.boss.lens,
  prescription: state.order.boss.prescription,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleOpen: () => dispatch(framesActions.open()),
  submitOrder: (boss: Boss) => dispatch(orderActions.submitStart(boss)),
  saveOrder: (state: ApplicationState) => dispatch(orderActions.saveOrderStart(state)),
  fetchFilterGroups: () => dispatch(filterActions.fetchGroupsStart()),
  saveFittingHeight: (boss: Boss, height: number) => dispatch(orderActions.saveFittingHeightStart(boss, height)),
  // checkCompatibility: (order: IOrderState) => dispatch(orderActions.checkCompatibility(order)),
  // fetchLensCompatibility: (prescription: Prescription, lens: Lens) => dispatch(orderActions.fetchLensCompatibility(prescription, lens)),
  // setErrors: (type: string, error: string) => dispatch(orderActions.setErrors(type, error)),
});

class OrderSelection extends LinkComponent<ComponentProps> {
  public componentDidMount() {
    const { fetchFilterGroups } = this.props;

    fetchFilterGroups();
  }

  public componentDidUpdate(prevProps: ComponentProps) {
    const { order } = this.props;

    if (order.redirect) {
      this.redirectToPage('/order');
    }
  }

  // public componentDidUpdate(prevProps: ComponentProps) {
  //   const { order } = this.props;
  //   //const isFrameSelected = !isEmptyObject(order.boss.frame);
  //   //const isLensSelected = !isEmptyObject(selectedLens);
  //   const isBarcode = !isEmptyObject(order.boss.barcode);

  //   // if (prevProps.selectedLens !== selectedLens && isFrameSelected) {
  //   //   checkCompatibility(order);
  //   // }

  //   // if (prevProps.prescription !== prescription && isLensSelected) {
  //   //   fetchLensCompatibility(prescription, selectedLens);
  //   // }

  //   if (isBarcode) {
  //     this.redirectToPage('/order');
  //   }
  // }

  public render() {
    const { isFetching, state, order, handleOpen, submitOrder, saveOrder, saveFittingHeight } = this.props;
    const frameSelectionButtonDisabled = isEmptyObject(order.boss.lens);
    const isFrameSelected = isEmptyObject(order.boss.frame);
    const isFittingHeightSelected = order.boss.fittingHeight ? true : false;
    const submitDisabled =  !isFittingHeightSelected

    return (
      <div className="page__content">
      {isFetching && <CircularProgress className="page__progress"/>}
        <PrescriptionSelectionContainer />

        {!isFrameSelected
          ? (
            <React.Fragment>
              <Section className="order-selection__recommend" tittle="Enter fitting height" wrap>
                <SelectField
                  disabled={isFetching}
                  className="order-selection__select"
                  label="Height"
                  value={order.boss.fittingHeight}
                  list={order.fittingProperties}
                  onChange={(value: number) => saveFittingHeight(order.boss, value)}
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
                <Button className="-full-width" variant="contained" disabled={isFetching} onClick={handleOpen}>
                  Edit
                </Button>
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
                <Button variant="contained" disabled={isFetching || frameSelectionButtonDisabled} onClick={handleOpen}>
                  Frame Selection
                </Button>
              </Section>
            </React.Fragment>
          )
        }

        <section className="order-selection__actions">
          <Button variant="contained" disabled={isFetching} onClick={() => saveOrder(state)}>Save</Button>
          {!isFrameSelected && (
            <Button variant="contained" disabled={isFetching || submitDisabled} onClick={() => submitOrder(order.boss)}>
              Submit Order
            </Button>
          )}
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelection);
