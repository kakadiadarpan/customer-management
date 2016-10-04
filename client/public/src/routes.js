/*import react libs*/
import React from 'react';
import { Route, IndexRoute } from 'react-router';
/*import all the pages for routes*/
import HomePage from './pages/HomePage';
import AppRootPage from './pages/AppRootPage';
import AddCustomer from './pages/AddCustomerPage.js';
import ViewDetails from './pages/ViewDetailsPage.js';
export default (
  <Route path="/" component={AppRootPage}>
    <IndexRoute component={HomePage} />
    <Route path="/home" component={HomePage}/>
    <Route path="/add" component={AddCustomer}/>
    <Route path="/view/:customer_id" component={ViewDetails}/>
  </Route>
);
