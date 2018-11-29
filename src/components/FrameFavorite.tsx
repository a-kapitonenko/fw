import * as React from 'react';
import Button from '@material-ui/core/Button';

import { Frame } from '../store/frames/types';
import * as framesActions from '../store/frames/actions';

import FrameTable from '../components/FrameTable';

import '../styles/frameFilter.css';

type ComponentProps = {
  similarFrames: Frame[];
  selectedFrame: Frame;
  buttonDisabled: boolean;
  setStep: typeof framesActions.setStep;
  setSelectedFrame: (frame: Frame) => void;
  handleSubmit: typeof framesActions.fetchSubmit;
};

class FrameFavorite extends React.Component<ComponentProps> {
  componentDidMount() {
    console.log(111111111111111111);
  }
  
  public render() {
    const { similarFrames, selectedFrame, buttonDisabled, setStep, setSelectedFrame, handleSubmit } = this.props;
    return (
      <React.Fragment>
        <h1 className="frame-selection__title">Similar Frames</h1>
        <section className="frame-selection__form">
          <h2 className="frame-selection__form-title">
            These frames are also compatible with the patients Rx and lens selection <br />
            Continue if patient is happy with current frame selection
        </h2>
          <FrameTable frames={similarFrames} selectedFrame={selectedFrame} handleClick={setSelectedFrame} />
          <section className="frame-selection__form-actions">
            <Button className="frame-selection__form-button" variant="contained" onClick={() => setStep(1)}>Back</Button>
            <Button className="frame-selection__form-button" variant="contained" disabled={buttonDisabled} onClick={() => handleSubmit(selectedFrame)}>Confirm</Button>
          </section>
        </section>
      </React.Fragment>
    );
  };
};

export default FrameFavorite;

/*const FrameFavorite: React.SFC<ComponentProps> = ({ similarFrames, selectedFrame, buttonDisabled, setStep, setSelectedFrame, handleSubmit }) => {
  console.log(111);
  return (
    <React.Fragment>
      <h1 className="frame-selection__title">Similar Frames</h1>
      <section className="frame-selection__form">
        <h2 className="frame-selection__form-title">
          These frames are also compatible with the patients Rx and lens selection <br />
          Continue if patient is happy with current frame selection
        </h2>
        <FrameTable frames={similarFrames} selectedFrame={selectedFrame} handleClick={setSelectedFrame} />
        <section className="frame-selection__form-actions">
          <Button className="frame-selection__form-button" variant="contained" onClick={() => setStep(1)}>Back</Button>
          <Button className="frame-selection__form-button" variant="contained" disabled={buttonDisabled} onClick={() => handleSubmit(selectedFrame)}>Confirm</Button>
        </section>
      </section>
    </React.Fragment>
  );
};*/