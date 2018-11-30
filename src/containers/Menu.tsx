import * as React from 'react';
import Button from '@material-ui/core/Button';

import LinkComponent from '../components/LinkComponent';

import '../styles/orderSelection.css';

type ComponentProps = {};

class Menu extends LinkComponent<ComponentProps> {
  public render() {
    return (
      <div className="page__content">
        <h1 className="page__title">Tailored Frame and Lens Design</h1>
        <img className="page__img" src="/menu.png" />
        <Button className="page__button" variant="contained" onClick={() => this.redirectToPage('/select')}>
          Enter
        </Button>
      </div>
    );
  }
}

export default Menu;
