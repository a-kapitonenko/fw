import React from 'react';
// import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/OutlinedInput';

interface AllProps {
  input: any;
  InputLabelProps: any;
  label: string;
  meta: any;
  number: any;
  variant: any;
}

const TextField = ({
  input,
  InputLabelProps,
  label,
  meta: { touched, error },
  number,
  variant,
  ...custom
}: AllProps) => (
  <FormControl
    error={touched && error ? true : false}
    
    {...custom}
  >
    <InputLabel {...InputLabelProps} variant="outlined">
      {label}
    </InputLabel>
    <Input
      {...input}
      onChange={(e)=>{
        if (number) {
          const numberValue = Number(e.target.value);

          if (Number.isNaN(numberValue)) {
            return;
          } 

          return input.onChange(e.target.value);
        }

        return input.onChange(e.target.value);
      }}
    />
    <FormHelperText>
      {touched && error}
    </FormHelperText>
  </FormControl>
);

export default TextField;
