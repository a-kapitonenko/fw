import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Boss, Blueprint } from '../../store/order/types';
import * as orderActions from '../../store/order/actions';
import * as framesActions from '../../store/frames/actions';
import Section from '../Section';
import PrescriptionSelectionContainer from '../../containers/PrescriptionSelectionContainer';
import LensSelectionContainer from '../../containers/LensSelectionContainer';
import FrameSelection from './FrameSelection';
import FittingHeight from './FittingHeight';
import '../../styles/orderSelection.css';

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
      <LensSelectionContainer />
      <FrameSelection
        isFetching={isFetching}
        errors={frameErrors}
        frame={boss.frame}
        onOpen={handleOpen}
      />
      <Section
        className="order-selection__info s-template__content"
        tittle="Message"
      >
        <p>{message}</p>
      </Section>
      <FittingHeight
        isFetching={isFetching}
        errors={fittingHeightErrors}
        boss={boss}
        properties={fittingProperties}
        onSave={saveFittingHeight}
      />
      <Section
        className="order-selection__content"
        tittle="36 Point Trace Dimentions"
      >
        <div className="order-selection__img-wrapper s-template__content">
          {blueprint['img'] && (
            <img className="order-selection__img" src={`./${blueprint.img}`} />
          )}
        </div>
      </Section>

      {renderActions()}
    </main>
  );
};

export default FinalOrderSelection;
