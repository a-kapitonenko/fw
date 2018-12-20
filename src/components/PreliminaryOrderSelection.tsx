import * as React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Lens } from '../store/lenses/types';
import * as framesActions from '../store/frames/actions';
import Section from './Section';
import PrescriptionSelectionContainer from '../containers/PrescriptionSelectionContainer';
import LensSelectionContainer from '../containers/LensSelectionContainer';
import FrameSelection from '../containers/FrameSelection';
import '../styles/frameFilter.css';

type ComponentProps = {
  isFetching: boolean;
  buttonDisabled: boolean;
  lens: Lens;
  recommendation: string;
  renderActions: any;
  handleOpen: typeof framesActions.open;
};

const renderFrameSelection = (
  disabled: boolean, 
  handleOpen: typeof framesActions.open,
) => {
  return (
    <React.Fragment>
      <FrameSelection />

      <Section tittle="The following frames are best suited for the patient" wrap>
        <Button
          variant="contained"
          disabled={disabled}
          onClick={handleOpen}
        >
          Frame Selection
        </Button>
      </Section>
    </React.Fragment>
  );
};

const PreliminaryOrderSelection: React.SFC<ComponentProps> = ({
  isFetching,
  buttonDisabled,
  lens,
  recommendation,
  renderActions,
  handleOpen,
}) => {
  return (
    <main className="p-template__main">
      {isFetching && <CircularProgress className="p-template__progress" />}
      <PrescriptionSelectionContainer />
      <Section className="order-selection__info s-template__content" tittle="Recommendation">
        <p>{recommendation}</p>
      </Section>
      <LensSelectionContainer />
      {renderFrameSelection(buttonDisabled, handleOpen)}

      <Section className="order-selection__lens s-template__content" tittle="Selected NikonEyes Lens">
        <p>{lens.name}</p>
      </Section>

      {renderActions()}
    </main>
  );
};

export default PreliminaryOrderSelection;
