import React, { Component } from 'react';
import AddCustomerContainer from '../containers/AddCustomerContainer.js';
import Navigation from '../components/navigation.js';
class AddCustomer extends Component {
  render() {
    return (
      <div>
        <Navigation/>
        <AddCustomerContainer/>
      </div>
    );
  }
}
export default AddCustomer;
