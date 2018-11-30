import * as React from 'react';

import { IOrderState } from '../store/order/types';
import { Lens } from '../store/lenses/types';

import '../styles/lensSelection.css';

type ComponentProps = {
  order: IOrderState;
  lenses: Lens[];
  errors: string;
  handleSubmit: (lens: Lens) => void;
}

const LensSelection: React.SFC<ComponentProps> = ({ order, lenses, errors, handleSubmit }) => {
  return (
    <section className="order-selection__section">
      <h2 className="order-selection__section-tittle">
        The following products can be used with the patients prescription<br />
        (Select the best NikonEyes Lens that best fits your needs)
      </h2>
      {errors && <div className="lens-selection__error">{errors}</div>}
      <section className="lens-selection__section">
        {lenses.map((lens: Lens) => (
          <div
            key={lens.value}
            className={`lens-selection__article ${order.boss.lens === lens ? 'lens-selected' : ''}`}
            onClick={() => handleSubmit(lens)}
          >
            {lens.name}
          </div>
        ))}
      </section>
    </section>
  );
};

export default LensSelection;
