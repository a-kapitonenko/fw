import * as React from 'react';
import { Lens } from '../store/lenses/types';
import Section from './Section';
import '../styles/lensSelection.css';

type ComponentProps = {
  errors: string;
  disabled: boolean;
  lenses: Lens[];
  selectedLens: Lens;
  handleSubmit: (lens: Lens) => void;
}

const LensSelection: React.SFC<ComponentProps> = ({
  errors,
  disabled,
  lenses,
  selectedLens,
  handleSubmit
}) => {
  return (
    <Section
      tittle={
        <React.Fragment>
          The following products can be used with the patients prescription
          <br />
          (Select the best NikonEyes Lens that best fits your needs)
        </React.Fragment>
      }
      wrap
    >
      {errors && <div className="order-selection__error">{errors}</div>}
      <div className="lens-selection">
        <div className={`lens-selection__lenses ${disabled ? '-opacity' : ''}`}>
          {lenses.map((lens: Lens) => (
            <div
              key={lens.value}
              className={`lens-selection__lens ${selectedLens.value === lens.value ? 'lens-selected' : ''}`}
              onClick={() => {
                if (!disabled) {
                  return handleSubmit(lens);
                }
              }}
            >
              {lens.name}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default LensSelection;
