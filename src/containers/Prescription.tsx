import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import * as orderActions from '../store/order/actions';
import { ApplicationState } from '../store';
import { OrderState } from '../store/order/types';

import { InputInformationFields } from '../constants/InputInformation';
import { isPrescriptionFilled } from '../helpers/orderSelectionHelper';

interface PropsFromState {
  order: OrderState,
}

interface PropsFromDispatch {
  handleChange: typeof orderActions.setRxInformation,
  savePrescription: typeof orderActions.savePrescription,
}

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleChange: (type: string, field: string, value: string) => dispatch(orderActions.setRxInformation(type, field, value)),
  savePrescription: (prescription: any) => dispatch(orderActions.savePrescription(prescription)),
});

class PrescriptionSelection extends React.Component<ComponentProps> {
  componentDidUpdate(prevProps: ComponentProps) {
    const { order, savePrescription } = this.props;
    isPrescriptionFilled(order.prescription);
    if (order.prescription !== prevProps.order.prescription) {
      savePrescription(order.prescription);
    }
  }

  render() {
    const { order, handleChange } = this.props;

    return (
      <div>
        {InputInformationFields.map((element, index) => (
          <TextField
            key={index}
            className="information__text"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            label={`OD ${element.label}`}
            value={order.prescription.OD[element.id]}
            onChange={(evt) => handleChange('OD', element.id, evt.target.value)}
          />
        ))}

        {InputInformationFields.map((element, index) => (
          <TextField
            key={index}
            className="information__text"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            label={`OS ${element.label}`}
            value={order.prescription.OS[element.id]}
            onChange={(evt) => handleChange('OS', element.id, evt.target.value)}
          />
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionSelection);
