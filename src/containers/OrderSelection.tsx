import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { ApplicationState } from '../store';
import { IOrderState } from '../store/order/types';
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
}

type PropsFromDispatch = {
  handleOpen: typeof framesActions.open;
  fetchFilterGroups: typeof filterActions.fetchFilterGroups;
  setFittingHeight: typeof orderActions.setFittingHeight;
  saveOrder: typeof orderActions.saveOrder;
  setErrors: typeof orderActions.setErrors;
}

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleOpen: () => dispatch(framesActions.open()),
  fetchFilterGroups: () => dispatch(filterActions.fetchFilterGroups()),
  setFittingHeight: (height: any) => dispatch(orderActions.setFittingHeight(height)),
  saveOrder: (order: IOrderState) => dispatch(orderActions.saveOrder(order)),
  setErrors: (type: string, error: string) => dispatch(orderActions.setErrors(type, error)),
});

class OrderSelection extends LinkComponent<ComponentProps> {
  public componentDidMount() {
    const { fetchFilterGroups } = this.props;

    fetchFilterGroups();
  }

  public componentDidUpdate(prevProps: ComponentProps) {
    const { order, setErrors } =this.props;
    const isFrameSelected = isEmptyObject(order.frame);

    if (prevProps.order.lens !== order.lens && !isFrameSelected) {
      setErrors('frame', 'this lens does not accecptable with selected frame');
    }
  }

  public render() {
    const { order, handleOpen, setFittingHeight, saveOrder } = this.props;
    const frameSelectionButtonDisabled = isEmptyObject(order.lens);
    const isFrameSelected = isEmptyObject(order.frame);
    const isFittingHeightSelected = order.fittingHeight ? true : false;
    const submitDisabled = !isEmptyObject(order.errors) || !isFittingHeightSelected

    return (
      <div className="page__content">
        <PrescriptionSelectionContainer />

        {!isFrameSelected
          ? (
            <React.Fragment>
              <Section className="order-selection__recommend" tittle="Enter fitting height" wrap>
                <SelectField
                  className="order-selection__select"
                  label="Height"
                  value={order.fittingHeight}
                  list={order.fittingProperties}
                  onChange={setFittingHeight}
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
            <Section className="order-selection__frame" tittle="Frame Selected">
              <img className="order-selection__frame-img" src={`/${order.frame.img}`} />
              {order.errors['frame'] && <p>{order.errors['frame']}</p>}
              <p>UPC Code: {order.frame.upc}</p>
              <p>Name of Frame: {order.frame.label}</p>
              <Button className="-full-width" variant="contained" onClick={handleOpen}>Edit</Button>
            </Section>
          )
          : (
            <React.Fragment>
              <Section className="order-selection__field" tittle="Selected NikonEyes Lens">
                <p>{order.lens.name}</p>
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
          {!isFrameSelected && <Button variant="contained" disabled={submitDisabled} onClick={() => this.redirectToPage('/order')}>Submit Order</Button>}
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelection);
