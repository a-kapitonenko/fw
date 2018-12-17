import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import LinkComponent from '../components/LinkComponent';
import * as orderActions from '../store/order/actions';
import * as filterActions from '../store/filter/actions';
import '../styles/menu.css';

type ComponentProps = {
  fetchOrderValues: typeof orderActions.fetchOrderValuesStart;
  fetchFilterGroups: typeof filterActions.fetchGroupsStart;
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchOrderValues: (id: string) => dispatch(orderActions.fetchOrderValuesStart(id)), 
  fetchFilterGroups: () => dispatch(filterActions.fetchGroupsStart()),
});

class Menu extends LinkComponent<ComponentProps> {
  private handleClick() {
    const { fetchFilterGroups, fetchOrderValues } = this.props;
    const userId = localStorage.getItem('id');
    
    fetchFilterGroups();
    
    if (userId !== null) {
      fetchOrderValues(userId);
    }
  }

  public render() {
    return (
      <main className="p-template__main">
        <h1 className="p-template__tittle">Tailored Frame and Lens Design</h1>
        <img className="page__img" src="/menu.png" />
        <Button 
          className="page__button"
          variant="contained"
          onClick={() => {
            this.handleClick();
            this.redirectToPage('/select');
          }}
        >
          Enter
        </Button>
      </main>
    );
  }
}

export default connect(null, mapDispatchToProps)(Menu);
