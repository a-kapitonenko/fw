import * as React from 'react';
import Button from '@material-ui/core/Button';

import { Groups, Field } from '../store/filter/types';

import '../styles/frameFilter.css';

type ComponentProps = {
  step: number;
  groups: Groups;
  disabled: boolean;
  renderGroup: (group: Field[], type: string) => JSX.Element[];
  handleClick: (index: number) => void;
  resetFilter: () => void;
};

const FrameFilter: React.SFC<ComponentProps> = ({ step, groups, disabled, renderGroup, handleClick, resetFilter }) => {
  return (
    <div className="frame-filter">
      <h2 className="frame-filter__title">Or use filter to find best variant</h2>
      <div className="frame-filter__bar">
        <Button variant="contained" onClick={() => handleClick(1)}>Color</Button>
        <Button variant="contained" onClick={() => handleClick(2)}>Fit</Button>
        <Button variant="contained" onClick={() => handleClick(3)}>Shape</Button>
        <Button variant="contained" onClick={() => handleClick(4)}>Material</Button>
      </div>
      <div className="frame-filter__groups">
        <div className={`frame-filter__group ${step === 1 ? '-active' : ''}`}>
          {renderGroup(groups.color, 'color')}
        </div>
        <div className={`frame-filter__group -flex-around ${step === 2 ? '-active' : ''}`}>
          <div className="-relative">
            <h3 className="frame-filter__group-label">Width</h3>
            {renderGroup(groups.width, 'width')}
          </div>
          <div className="-relative">
            <h3 className="frame-filter__group-label">Nose bridge</h3>
            {renderGroup(groups.noseBridge, 'noseBridge')}
          </div>
        </div>
        <div className={`frame-filter__group ${step === 3 ? '-active' : ''}`}>
          {renderGroup(groups.shape, 'shape')}
        </div>
        <div className={`frame-filter__group ${step === 4 ? '-active' : ''}`}>
          {renderGroup(groups.material, 'material')}
        </div>
      </div>
      <Button variant="contained" disabled={disabled} onClick={resetFilter}>Reset filters</Button>
    </div>
  );
};

export default FrameFilter;
