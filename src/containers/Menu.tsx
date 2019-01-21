import * as React from 'react';
import Button from '@material-ui/core/Button';
import * as routes from '../constants/routes';
import LinkComponent from '../components/LinkComponent';
import '../styles/menu.css';

type ComponentProps = {};

class Menu extends LinkComponent<ComponentProps> {
  public render() {
    return (
      <main className="p-template__main">
        <h1 className="p-template__tittle">Tailored Frame and Lens Design</h1>
        <img className="page__img" src="./menu.png" />
        <Button 
          className="page__button"
          variant="contained"
          onClick={() => this.redirectToPage(routes.SELECT)}
        >
          Enter
        </Button>
      </main>
    );
  }
}

export default Menu;
