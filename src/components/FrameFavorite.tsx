import * as React from 'react';
import Button from '@material-ui/core/Button';

import { Frame } from '../store/frames/types';
import * as framesActions from '../store/frames/actions';

import FrameTable from '../components/FrameTable';

import '../styles/frameFilter.css';

type ComponentProps = {
  similarFrames: Frame[];
  selectedFrame: Frame;
  setStep: typeof framesActions.setStep;
  setSelectedFrame: any;
  onConfirm: any;
};

const FrameFavorite: React.SFC<ComponentProps> = ({ similarFrames, selectedFrame, setStep, setSelectedFrame, onConfirm }) => {
  return (
    <div className="frame-selection__content yellow-section">
      <h1 className="frame-selection__title">Similar Frames</h1>
      <section className="frame-selection__form">
        <h2 className="frame-selection__form-title">
          These frames are also compatible with the patients Rx and lens selection <br />
          Continue if patient is happy with current frame selection
        </h2>
        <FrameTable frames={similarFrames} selectedFrame={selectedFrame} handleClick={setSelectedFrame} />
        <section className="frame-selection__form-actions">
          <Button className="frame-selection__form-button" variant="contained" onClick={() => setStep(1)}>Back</Button>
          <Button className="frame-selection__form-button" variant="contained" onClick={() => onConfirm(selectedFrame)}>Confirm</Button>
        </section>
      </section>
    </div>
  );
};

export default FrameFavorite;
