/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Route as ReactDOMRouter,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface IRouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isPrivateAndPublic?: boolean;
  component: React.ComponentType | any;
}

const Route: React.FC<IRouteProps> = ({
  isPrivate = false,
  isPrivateAndPublic = false,
  component: Component,
  ...rest
}) => {
  const { isLogin } = useAuth();

  return (
    <ReactDOMRouter
      {...rest}
      render={({ location }) => {
        if (isPrivateAndPublic) {
          return <Component />;
        }
        return isPrivate === isLogin() ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/token' : '/consult',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
