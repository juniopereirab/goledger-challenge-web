import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProductInfo from './pages/ProductInfo';
import VendorInfo from './pages/VendorInfo';
import CreateProduct from './pages/CreateProduct';
import CreateVendor from './pages/CreateVendor';

function Routes() {
  return (
      <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path={`/product/:code`} component={ProductInfo} />
          <Route path="/seller" component={VendorInfo} />
          <Route path="/createProduct" component={CreateProduct} />
          <Route path="/createVendor" component={CreateVendor} />
      </Switch>
  );
}

export default Routes;