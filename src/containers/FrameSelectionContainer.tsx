import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ApplicationState } from '../store';

import * as searchPanelActions from '../store/searchPanel/actions';
import * as framesActions from '../store/frames/actions';

import SearchPanel from '../components/SearchPanel';

import '../styles/frameSelection.css';

interface PropsFromState {
  open: boolean;
  anchor: any;
  list: any;
}

interface PropsFromDispatch {
  handleOpen: typeof searchPanelActions.openSearchPanel;
  handleClose: typeof searchPanelActions.closeSearchPanel;
  handleFetch: any;
}

type AllProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  open: state.searchPanel.open,
  anchor: state.searchPanel.anchor,
  list: state.frames.list
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleOpen: (element: any) => dispatch(searchPanelActions.openSearchPanel(element.target)),
  handleClose: () => dispatch(searchPanelActions.closeSearchPanel()),
  handleFetch: () => dispatch(framesActions.fetchFrames()),
});

class FrameSelectionContainer extends React.Component<AllProps> {
  componentDidMount() {
    const { handleFetch } = this.props;

    handleFetch();
  }

  render() {
    const { open, anchor, handleOpen, handleClose } = this.props;

    return (
      <div className="page__wrapper yellow-section">
        <div className="main-content">
          <h1 className="page__title">Tailored Frame Selection</h1>
          <section className="frame-selection__form">
            <h2 className="frame-selection__form-title">Please enter up to five frame UPC's to check for compatibility and select the one that best suits the patient</h2>
            <input className="frame-selection__form-input" type="text" onClick={handleOpen} />
          </section>

          <SearchPanel open={open} anchorEl={anchor} handleClose={handleClose} />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameSelectionContainer)
