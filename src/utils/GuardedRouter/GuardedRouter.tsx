// import * as React from 'react';
// import { Dispatch } from 'redux';
// import { connect } from 'react-redux';
// import { Redirect, Switch, HashRouter } from 'react-router-dom';
// import * as routes from '../../constants/routes';
// import { ApplicationState } from '../../store';
// import ProtectedRoute from './ProtectedRoute';
// import Menu from '../../containers/Menu';
// import OrderSelection from '../../containers/OrderSelectionСontainer';
// import Boss from '../../containers/BossContainer';

// type PropsFromState = {
//   redirect: boolean;
// };

// type PropsFromDispatch = {

// };

// type ComponentProps = PropsFromState & PropsFromDispatch;

// const mapStateToProps = (state: ApplicationState) => ({
//   redirect: state.order.redirect,
// });

// const mapDispatchToProps = (dispatch: Dispatch) => ({
// });

// class GuardedRouter extends React.Component<ComponentProps> {
//   render() {
//     const { } = this.props;

//     return (
//       <HashRouter>
//         <Switch>
//           <ProtectedRoute path={routes.HOME} component={Menu} isAllowed={true} redirectTo={routes.TASKS} />
//           <ProtectedRoute path={routes.SIGNIN} component={Signin}  isAllowed={!isLogIn}  redirectTo={routes.TASKS} />
//           <ProtectedRoute path={routes.TASKS} component={Main} isAllowed={isLogIn} redirectTo={routes.LOGIN} />
//           <Redirect to={isLogIn ? routes.TASKS : routes.LOGIN} />,
//         </Switch>
//       </HashRouter>
//     );
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(GuardedRouter);
