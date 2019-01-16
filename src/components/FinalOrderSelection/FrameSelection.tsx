import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Frame } from '../../store/frames/types';
import { open } from '../../store/frames/actions';
import Section from '../Section';
import FrameSelection from '../../containers/FrameSelection';

type ComponentProps = {
  isFetching: boolean;
  errors: string;
  frame: Frame;
  onOpen: typeof open;
};

const FrameSection: React.SFC<ComponentProps> = ({
  isFetching, 
  errors, 
  frame, 
  onOpen,
}) => {
  return (
    <React.Fragment>
      <FrameSelection />

      <Section
        className="order-selection__content"
        tittle="Frame Selected"
        errors={errors}
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
          onClick={onOpen}
        >
          Edit
      </Button>
      </Section>
    </React.Fragment>
  );
};

export default FrameSection;
