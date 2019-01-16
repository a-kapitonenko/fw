import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Groups, GroupsTypes, Field } from '../store/filter/types';
import { filterBar } from '../constants/frameFilter';
import '../styles/frameFilter.css';

type ComponentProps = {
  disabled: boolean;
  errors: string;
  step: number;
  groups: Groups;
  disabledButton: boolean;
  renderGroup: (group: Field[], type: string, disabled: boolean) => JSX.Element[];
  handleClick: (index: number) => void;
  resetFilter: () => void;
};

const FrameFilter: React.SFC<ComponentProps> = ({
  disabled,
  errors,
  step,
  groups,
  disabledButton,
  renderGroup,
  handleClick,
  resetFilter,
}) => {
  const firstFilterFieldActive = step === 1 ? '-active' : '';
  const seconFilterFieldActive = step === 2 ? '-active' : '';
  const thirdFilterFieldActive = step === 3 ? '-active' : '';
  const fourthFilterFieldActive = step === 4 ? '-active' : '';
  
  return (
    <div className="frame-filter">
      <h2 className="frame-filter__title">
        Or use filter to find best variant
      </h2>
      {errors && <div className="frame-filter__error">{errors}</div>}
      <div className="frame-filter__bar">
        {filterBar.map((item, index) => (
           <Button
            key={index}
            variant="contained"
            disabled={disabled}
            onClick={() => handleClick(index + 1)}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="frame-filter__groups">
        <div className={`frame-filter__group ${firstFilterFieldActive}`}>
          {renderGroup(groups.color, GroupsTypes.COLOR, disabled)}
        </div>
        <div className={`frame-filter__group -flex-around ${seconFilterFieldActive}`}>
          <div className="-relative">
            <h3 className="frame-filter__group-label">Width</h3>
            {renderGroup(groups.width, GroupsTypes.WIDTH, disabled)}
          </div>
          <div className="-relative">
            <h3 className="frame-filter__group-label">Nose bridge</h3>
            {renderGroup(groups.noseBridge, GroupsTypes.NOSE_BRIDGE, disabled)}
          </div>
        </div>
        <div className={`frame-filter__group ${thirdFilterFieldActive}`}>
          {renderGroup(groups.shape, GroupsTypes.SHAPE, disabled)}
        </div>
        <div className={`frame-filter__group ${fourthFilterFieldActive}`}>
          {renderGroup(groups.material, GroupsTypes.MATERIAL, disabled)}
        </div>
      </div>
      
      <Button
        variant="contained"
        disabled={disabled || disabledButton}
        onClick={resetFilter}
      >
        Reset filters
      </Button>
    </div>
  );
};

export default FrameFilter;
