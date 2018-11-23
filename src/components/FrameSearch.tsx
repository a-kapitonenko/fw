import * as React from 'react';
import Select, { components } from 'react-select';

import { Frame } from '../store/frames/types';

import '../styles/frameSearch.css';

type ComponentProps = {
  fetching: boolean;
  open: boolean;
  list: Frame[];
  selectedFrames: Frame[];
  onInputChange: any;
  onChange: any;
  onBlur: any;
};

const NoOptionsMessage = (props: any) => {
  return (
    <div>
      <components.NoOptionsMessage {...props} />
    </div>
  );
};

const Option = (props: any) => {
  return (
    <div className="frame-search__option">
      <components.Option {...props}>
        <div>{props.value}</div>
        <div>{props.label}</div>
        <img className="frame-search__img" src={`/${props.data.img}`} />
        <div>{props.data.compatibility ? 'true' : 'false'}</div>
      </components.Option>
    </div>
  );
};

const Menu = (props: any) => {
  return <components.Menu {...props} />
}

const DropdownIndicator = (props: any) => {
  return components.DropdownIndicator && (
    <div />
  );
};

const IndicatorSeparator = ({ innerProps }: any) => {
  return (
    <span />
  );
};

const FrameSearch: React.SFC<ComponentProps> = ({ fetching, open, list, selectedFrames, onInputChange, onChange, onBlur }) => {
  return (
    <div className="frame-search">
      <h2 className="frame-search__title">Please enter up to five frame UPC's to check for compatibility and select the one that best suits the patient</h2>
      <Select
        defaultValue={selectedFrames}
        className="frame-search__input"
        menuIsOpen={open}
        isLoading={fetching}
        openMenuOnClick={false}
        isMulti
        onChange={onChange}
        onBlur={onBlur}
        components={{ Menu, Option, IndicatorSeparator, DropdownIndicator, NoOptionsMessage }}
        options={list}
        onInputChange={onInputChange}
      />
    </div>
  );
};

export default FrameSearch;
