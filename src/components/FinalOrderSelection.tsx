import * as React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Boss, Blueprint } from '../store/order/types';
import { Frame } from '../store/frames/types';
import * as orderActions from '../store/order/actions';
import * as framesActions from '../store/frames/actions';
import Section from './Section';
import SelectField from './SelectField';
import PrescriptionSelectionContainer from '../containers/PrescriptionSelectionContainer';
import LensSelectionContainer from '../containers/LensSelectionContainer';
import FrameSelection from '../containers/FrameSelection';
import '../styles/orderSelection.css';

type ComponentProps = {
  isFetching: boolean;
  fittingHeightErrors: string;
  frameErrors: string;
  boss: Boss;
  blueprint: Blueprint;
  fittingProperties: any;
  message: string;
  renderActions: any;
  handleOpen: typeof framesActions.open;
  saveFittingHeight: typeof orderActions.saveFittingHeightStart;
};

const renderFittingHeight = (
  isFetching: boolean, 
  fittingHeightErrors: string, 
  boss: Boss,
  fittingProperties: any,
  saveFittingHeight: typeof orderActions.saveFittingHeightStart,
) => {
  return (
    <Section tittle="Enter fitting height" wrap>
      {fittingHeightErrors && <div className="order-selection__error">{fittingHeightErrors}</div>}

      <SelectField
        disabled={isFetching}
        className="order-selection__select"
        label="Height"
        value={boss.fittingHeight}
        list={fittingProperties}
        onChange={(value: number) => saveFittingHeight(boss, value)}
      />
    </Section>
  );
}

const renderFrameSelection = (
  isFetching: boolean, 
  frameErrors: string, 
  frame: Frame, 
  handleOpen: typeof framesActions.open,
) => {
  return (
    <React.Fragment>
      <FrameSelection />

      <Section
        className="order-selection__content"
        tittle="Frame Selected"
        errors={frameErrors}
      >
        <div className="order-selection__img-wrapper s-template__content">
          <img className="order-selection__img" src={`/${frame.img}`} />
        </div>
        <div className="order-selection__frame-description">
          <p>UPC Code: {frame.upc}</p>
          <p>Name of Frame: {frame.label}</p>
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
    </React.Fragment>
  );
};

const FinalOrderSelection: React.SFC<ComponentProps> = ({
  isFetching,
  fittingHeightErrors,
  frameErrors,
  boss,
  blueprint,
  fittingProperties,
  message,
  handleOpen,
  saveFittingHeight,
  renderActions,
}) => {
  return (
    <main className="p-template__main">
      {isFetching && <CircularProgress className="p-template__progress" />}
      <PrescriptionSelectionContainer />
      {renderFittingHeight(isFetching, fittingHeightErrors, boss, fittingProperties, saveFittingHeight)}
      <Section className="order-selection__info s-template__content" tittle="Message">
        <p>{message}</p>
      </Section>
      <LensSelectionContainer />
      {renderFrameSelection(isFetching, frameErrors, boss.frame, handleOpen)}
      
      <Section className="order-selection__content" tittle="36 Point Trace Dimentions">
        <div className="order-selection__img-wrapper s-template__content">
          {blueprint['img'] && (
            <img className="order-selection__img" src={`/${blueprint.img}`} />
          )}
        </div>
      </Section>

      {renderActions()}
    </main>
  );
};

export default FinalOrderSelection;
