import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ApplicationState } from '../store';

import { openSearchPanel, closeSearchPanel } from '../store/searchPanel/actions';

import FrameSelection from '../components/FrameSelection';

import '../styles/frameSelection.css';

const mapStateToProps = (state: ApplicationState) => ({
  open: state.searchPanel.open,
  anchor: state.searchPanel.anchor,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleOpen: (element: any) => dispatch(openSearchPanel(element.target)),
  handleClose: () => dispatch(closeSearchPanel()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FrameSelection)
