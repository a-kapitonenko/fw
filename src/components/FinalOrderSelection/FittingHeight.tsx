import * as React from 'react';
import { Boss } from '../../store/order/types';
import { saveFittingHeightStart } from '../../store/order/actions';
import Section from '../Section';
import SelectField from '../SelectField';

type ComponentProps = {
  isFetching: boolean;
  errors: string; 
  boss: Boss;
  properties: any;
  onSave: typeof saveFittingHeightStart;
};

const FittingHeight: React.SFC<ComponentProps> = ({
  isFetching, 
  errors, 
  boss,
  properties,
  onSave,
}) => {
  return (
    <Section tittle="Enter fitting height" wrap>
      {errors
        && (
          <div className="order-selection__error">
            {errors}
          </div>
        )
      }

      <SelectField
        disabled={isFetching}
        className="order-selection__select"
        label="Height"
        value={boss.fittingHeight}
        list={properties}
        onChange={(value: number) => onSave(boss, value)}
      />
    </Section>
  );
};

export default FittingHeight;
