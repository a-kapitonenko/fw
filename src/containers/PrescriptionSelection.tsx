import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import Button from '@material-ui/core/Button';

import { OrderState } from '../store/order/types';
import { InputInformationFields } from '../constants/InputInformation';
import validate from '../helpers/validate';

import Text from '../components/Text';

interface IProps {
  handleRxInformation: any,
}

type AllProps = IProps & InjectedFormProps<OrderState, IProps>;

class InputInformation extends React.Component<AllProps> {
  render() {
    const { pristine, submitting, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        {InputInformationFields.map((element, index) => (
          <Field
            key={index}
            className="information__text"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            name={`OrderState.OD[${element.id}]`}
            label={`OD ${element.label}`}
            number
            component={Text}
          />
        ))}

        {InputInformationFields.map((element, index) => (
          <Field
            key={index}
            className="information__text"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            name={`OrderState.OS[${element.id}]`}
            label={`OS ${element.label}`}
            number
            component={Text}
          />
        ))}

        <Button type="submit" variant="contained" disabled={submitting || pristine}>Save Prescription</Button>
      </form>
    );
  }
}

const formConfiguration = {
  form: 'order',
  validate
};

export default reduxForm<OrderState, IProps>(formConfiguration)(InputInformation);