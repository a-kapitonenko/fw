import * as React from 'react';
import Button from '@material-ui/core/Button';

import FrameTable from '../components/FrameTable';

import '../styles/frameFilter.css';

type ComponentProps = {
  filterFrames: any;
  selectedFrame: any;
  setSelectedFrame: any;
};

const FrameFavorite: React.SFC<ComponentProps> = ({ filterFrames, selectedFrame, setSelectedFrame }) => {
  return (
    <div className="frame-selection__content yellow-section">
      <h1 className="frame-selection__title">Similar Frames</h1>
      <section className="frame-selection__form">
        <div className="frame-selection__form-content">
          <h2 className="frame-selection__form-title">
            These frames are also compatible with the patients Rx and lens selection <br />
            Continue if patient is happy with current frame selection
          </h2>
            <FrameTable frames={filterFrames} selectedFrame={selectedFrame} handleClick={setSelectedFrame} />
        </div>
        <section className="frame-selection__form-actions">
          <Button className="frame-selection__form-button" variant="contained">Back</Button>
          <Button className="frame-selection__form-button" variant="contained">Confirm</Button>
        </section>
      </section>
    </div>
  );
};

export default FrameFavorite;
