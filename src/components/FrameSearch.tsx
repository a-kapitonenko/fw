import * as React from 'react';
import Select, { components } from 'react-select';

import { Frame } from '../store/frames/types';

import '../styles/frameSearch.css';

type ComponentProps = {
  isFetching: boolean;
  errors: string;
  open: boolean;
  list: Frame[];
  selectedFrames: Frame[];
  onInputChange: (props: string) => string;
  onChange: (props: Frame[]) => Frame[];
  onBlur: (event: React.FocusEvent<HTMLElement>) => void;
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

const IndicatorsContainer = (props: any) => {
  return (
    <components.IndicatorsContainer className="frame-search__indicator" {...props} />
  );
};

const MultiValueRemove = (props: any) => {
  const className = `${props.innerProps.className} frame-search__indicator-remove`;
  props.innerProps.className = className;

  return (
    <components.MultiValueRemove {...props} />
  );
};

const DropdownIndicator = () => {
  return components.DropdownIndicator && (
    <div />
  );
};

const IndicatorSeparator = () => {
  return (
    <span />
  );
};

const FrameSearch: React.SFC<ComponentProps> = ({ isFetching, errors, open, list, selectedFrames, onInputChange, onChange, onBlur }) => {
  return (
    <div className="frame-search">
      <h2 className="frame-search__title">Please enter up to five frame UPC's to check for compatibility and select the one that best suits the patient</h2>
      {errors && <div className="frame-search__error">{errors}</div>}
      <Select
        defaultValue={selectedFrames}
        className="frame-search__input"
        menuIsOpen={open}
        isLoading={isFetching}
        openMenuOnClick={false}
        isMulti
        onChange={onChange}
        onBlur={onBlur}
        components={{ Menu, Option, MultiValueRemove, IndicatorsContainer, IndicatorSeparator, DropdownIndicator, NoOptionsMessage }}
        options={list}
        onInputChange={onInputChange}
      />
    </div>
  );
};

export default FrameSearch;
