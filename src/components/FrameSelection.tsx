import * as React from 'react';
import Button from '@material-ui/core/Button';

import { Frame } from '../store/frames/types';
import * as framesActions from '../store/frames/actions';

import FrameSearchContainer from '../containers/FrameSearchContainer';
import FrameFilterContainer from '../containers/FrameFilterContainer';
import FrameSearchTable from './FrameSearchTable';
// import FrameTable from './FrameTable';

import '../styles/frameSelection.css';

type ComponentProps = {
  searchFrames: Frame[];
  filterFrames: Frame[];
  selectedFrame: Frame;
  buttonDisabled: boolean;
  setStep: typeof framesActions.setStep;
  setSelectedFrame: (frame: Frame) => void;
  handleClose: typeof framesActions.close;
};

const FrameSelection: React.SFC<ComponentProps> = ({ searchFrames, selectedFrame, buttonDisabled, setStep, setSelectedFrame, handleClose }) => {
  return (
    <React.Fragment>
      <h1 className="frame-selection__title">Tailored Frame Selection</h1>
      <section className="frame-selection__form">
        <div className="frame-selection__form-content">
          <div className="frame-selection__form-section -flex-column-between">
            <FrameSearchContainer />
            <FrameSearchTable frames={searchFrames} selectedFrame={selectedFrame} handleClick={setSelectedFrame} />
          </div>
          <FrameFilterContainer />
        </div>
        <section className="frame-selection__form-actions">
          <Button className="frame-selection__form-button" variant="contained" onClick={handleClose}>Back</Button>
          <Button className="frame-selection__form-button" variant="contained" disabled={buttonDisabled} onClick={() => setStep(2)}>Next</Button>
        </section>
      </section>
    </React.Fragment>
  )
};

export default FrameSelection;
