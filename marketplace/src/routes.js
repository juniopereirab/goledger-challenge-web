import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProductInfo from './pages/ProductInfo';

function Routes() {
  return (
      <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path={`/product/:code`} component={ProductInfo} />
      </Switch>
  );
}

export default Routes;