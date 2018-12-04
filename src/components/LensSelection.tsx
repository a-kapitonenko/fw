import * as React from 'react';

import { Lens } from '../store/lenses/types';

import '../styles/lensSelection.css';

type ComponentProps = {
  errors: string;
  disabled: boolean;
  lenses: Lens[];
  selectedLens: Lens;
  handleSubmit: (lens: Lens) => void;
}

const LensSelection: React.SFC<ComponentProps> = ({ errors, disabled, lenses, selectedLens, handleSubmit }) => {
  return (
    <section className="order-selection__section">
      <h2 className="order-selection__section-tittle">
        The following products can be used with the patients prescription<br />
        (Select the best NikonEyes Lens that best fits your needs)
      </h2>
      {errors && <div className="order-selection__error">{errors}</div>}
      <section className="lens-selection__section">
        {lenses.map((lens: Lens) => (
          <div
            key={lens.value}
            className={`lens-selection__article ${selectedLens === lens ? 'lens-selected' : ''}`}
            onClick={() => {
              if (!disabled) {
                return handleSubmit(lens);
              }
            }}
          >
            {lens.name}
          </div>
        ))}
      </section>
    </section>
  );
};

export default LensSelection;
