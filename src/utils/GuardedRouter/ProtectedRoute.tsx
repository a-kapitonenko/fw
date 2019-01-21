import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

type ComponentProps = {
  exact?: boolean;
  path: string;
  component: any;
  isAllowed: boolean;
  redirectTo: string;
}

const ProtectedRoute: React.SFC<ComponentProps> = ({
  exact,
  path,
  component: Comp,
  isAllowed,
  redirectTo
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (isAllowed ? <Comp /> : <Redirect to={redirectTo} />)}
    />
  );
};

export default ProtectedRoute;
