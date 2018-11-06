import * as React from 'react';

import * as searchPanelActions from '../store/searchPanel/actions';

import Menu from './SearchPanel';

import '../styles/frameSelection.css';

interface PropsFromState {
  open: boolean,
  anchor: any
}

interface PropsFromDispatch {
  handleOpen: typeof searchPanelActions.openSearchPanel,
  handleClose: typeof searchPanelActions.closeSearchPanel,
}

type AllProps = PropsFromState & PropsFromDispatch;

const FrameSelection = ({
  open,
  anchor,
  handleOpen,
  handleClose,
}: AllProps) => (
  <div className="page__wrapper yellow-section">
    <div className="main-content">
      <h1 className="page__title">Tailored Frame Selection</h1>
      <section className="frame-selection__form">
        <h2 className="frame-selection__form-title">Please enter up to five frame UPC's to check for compatibility and select the one that best suits the patient</h2>
        <input className="frame-selection__form-input" type="text" onClick={handleOpen} />
      </section>

      <Menu open={open} anchorEl={anchor} handleClose={handleClose} />
    </div>
  </div>
);

export default FrameSelection;
