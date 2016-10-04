import React, { Component } from 'react';
import Navigation from '../components/navigation.js';
import HomePageContainer from '../containers/HomePageContainer.js';
class HomePage extends Component {
  render() {
    return (
      <div>
        <Navigation/>
    <HomePageContainer/>
      </div>
    );
  }
}
export default HomePage;
