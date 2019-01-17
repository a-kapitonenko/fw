import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

type ComponentProps = {
  path: string;
  component: any;
  isAllowed: boolean;
  redirectTo: string;
}

const ProtectedRoute: React.SFC<ComponentProps> = ({
  path,
  component: Comp,
  isAllowed,
  redirectTo
}) => {
  return (
    <Route
      path={path}
      render={() => (isAllowed ? <Comp /> : <Redirect to={redirectTo} />)}
    />
  );
};

export default ProtectedRoute;
