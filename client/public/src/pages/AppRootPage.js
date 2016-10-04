import React from 'react';
import { Component } from 'react';
import AppRoot from '../components/approot.js';

export default class AppRootPage extends Component {
  render() {
    return (
      <AppRoot>
      {this.props.children}
      </AppRoot>
    );
  }
}
