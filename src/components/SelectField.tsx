import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import '../styles/lensSelection.css';

type ComponentProps = {
  className: string;
  label: string;
  value: number | string;
  list: any;
  onChange: (value: number | string) => void;
};

const SelectField: React.SFC<ComponentProps> = ({ className, label, value, list, onChange }) => {
  return (
    <FormControl variant="outlined" className={className}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
        input={
          <OutlinedInput
            labelWidth={50}
            name={label}
          />
        }
      >
        {list.map((item: any) => (
          <MenuItem key={item.value} value={item.value}>{item.value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
