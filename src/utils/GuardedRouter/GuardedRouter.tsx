import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { ApplicationState } from '../../store';
import ProtectedRoute from './ProtectedRoute';
import Menu from '../../containers/Menu';
import OrderSelection from '../../containers/OrderSelectionСontainer';
import Boss from '../../containers/BossContainer';
import PageHeader from '../../containers/PageHeader';

type ComponentProps = {
  redirect: boolean;
};

const mapStateToProps = (state: ApplicationState) => ({
  redirect: state.order.redirect,
});

class GuardedRouter extends React.Component<ComponentProps> {
  render() {
    const { redirect } = this.props;
    const isUserSet = localStorage.getItem('id');

    return (
      <HashRouter>
        <React.Fragment>
          <PageHeader />

          <Switch>
            <ProtectedRoute
              exact
              path={routes.HOME}
              component={Menu}
              isAllowed={true}
              redirectTo={routes.ORDER}
            />
            <ProtectedRoute
              path={routes.SELECT}
              component={OrderSelection}
              isAllowed={!redirect}
              redirectTo={routes.ORDER}
            />
            <ProtectedRoute
              path={routes.ORDER}
              component={Boss}
              isAllowed={redirect}
              redirectTo={routes.HOME}
            />
            <Redirect to={!isUserSet ? routes.HOME : routes.SELECT} />
          </Switch>
        </React.Fragment>
      </HashRouter>
    );
  }
}

export default connect(mapStateToProps)(GuardedRouter);
