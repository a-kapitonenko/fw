import * as React from 'react';
import Button from '@material-ui/core/Button';

import { Frame } from '../store/frames/types';
import * as framesActions from '../store/frames/actions';

import { isEmptyObject } from '../helpers/mathHelper';

import FrameSearchContainer from '../containers/FrameSearchContainer';
import FrameFilterContainer from '../containers/FrameFilterContainer';
import FrameSearchTable from './FrameSearchTable';
import FrameTable from './FrameTable';

import '../styles/frameSelection.css';


type ComponentProps = {
  searchFrames: Frame[];
  filterFrames: Frame[];
  selectedFrame: Frame;
  setStep: typeof framesActions.setStep;
  setSelectedFrame: any;
  handleClose: typeof framesActions.close;
};

const FrameSelection: React.SFC<ComponentProps> = ({ searchFrames, filterFrames, selectedFrame, setStep, setSelectedFrame, handleClose }) => {
  const buttonDisabled = isEmptyObject(selectedFrame);

  return (
    <div className="frame-selection__content yellow-section">
      <h1 className="frame-selection__title">Tailored Frame Selection</h1>
      <section className="frame-selection__form">
        <div className="frame-selection__form-content -flex">
          <div className="frame-selection__form-section -flex-column-between">
            <FrameSearchContainer />
            <FrameSearchTable frames={searchFrames} selectedFrame={selectedFrame} handleClick={setSelectedFrame} />
          </div>
          <div className="frame-selection__form-section">
            <FrameFilterContainer />
            <FrameTable frames={filterFrames} selectedFrame={selectedFrame} handleClick={setSelectedFrame} />
          </div>
        </div>
        <section className="frame-selection__form-actions">
          <Button className="frame-selection__form-button" variant="contained" onClick={handleClose}>Back</Button>
          <Button className="frame-selection__form-button" variant="contained" disabled={buttonDisabled} onClick={() => setStep(2)}>Next</Button>
        </section>
      </section>
    </div>
  )
};

export default FrameSelection;
