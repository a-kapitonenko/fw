import * as React from 'react';

import { IOrderState } from '../store/order/types';
import { Lens } from '../store/lenses/types';
import { setLens } from '../store/order/actions';

import '../styles/lensSelection.css';

type ComponentProps = {
  order: IOrderState;
  list: Lens[];
  errors: string;
  handleClick: typeof setLens;
}

const LensSelection: React.SFC<ComponentProps> = ({ order, list, errors, handleClick }) => {
  return (
    <section className="order-selection__section">
      <h2 className="order-selection__tittle">
        The following products can be used with the patients prescription<br />
        (Select the best NikonEyes Lens that best fits your needs)
      </h2>
      <section className="lens-selection__section">
        {errors
          ? <div className="lens-selection__error">{errors}</div>
          : (
            <React.Fragment>
              {list.map((lens: Lens) => (
                <div
                  key={lens.value}
                  className={`lens-selection__article ${order.lens === lens ? 'lens-selected' : ''}`}
                  onClick={() => handleClick(lens)}
                >
                  {lens.name}
                </div>
              ))}
            </React.Fragment>
          )
        }
      </section>
    </section>
  );
};

export default LensSelection;
