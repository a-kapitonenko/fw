import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ApplicationState } from '../store';
import { Lens } from '../store/lenses/types';
import { setLens } from '../store/order/actions';

import LensSelection from '../components/LensSelection';

import '../styles/lensSelection.css';

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
  list: state.lenses.list,
  errors: state.lenses.errors,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleClick: (lens: Lens) => dispatch(setLens(lens))
});

export default connect(mapStateToProps, mapDispatchToProps)(LensSelection);