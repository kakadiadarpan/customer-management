import React, { Component } from 'react';
import Navigation from '../components/navigation.js';
import Details from '../containers/DetailsContainer.js';
class ViewDetailsPage extends Component {
  render() {
    return (
      <div>
        <Navigation/>
        <Details>
    {this.props.params}
    </Details>
      </div>
    );
  }
}
export default ViewDetailsPage;
