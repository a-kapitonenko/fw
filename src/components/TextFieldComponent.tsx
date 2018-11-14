import React from 'react';
import TextField from '@material-ui/core/TextField';

interface AllProps {
  input: any;
  InputLabelProps: any;
  label: string;
  meta: any;
  number: any;
  variant: any;
  className: string;
}

const TextFieldComponent = ({
  input,
  meta: { touched, error },
  className,
  InputLabelProps,
  variant,
  label,
  number,
}: AllProps) => (
  <TextField
    className={className}
    error={touched && error ? true : false}
    helperText={touched && error}
    InputLabelProps={InputLabelProps}
    inputProps={{
      ...input,
      onChange: (e)=> {
        if (number) {
          const numberValue = Number(e.target.value);
  
          if (Number.isNaN(numberValue)) {
            return;
          } 
  
          return input.onChange(e.target.value);
        }
  
        return input.onChange(e.target.value);
      }
    }}
    label={label}
    variant={variant}
  />
);

export default TextFieldComponent;
