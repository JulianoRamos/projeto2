import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import Error401 from '../pages/Error401';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />

    <Route path="/error-401" component={Error401} isPrivateAndPublic />
  </Switch>
);

export default Routes;
