import React, { Component } from 'react';
class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
          <a className="navbar-brand" href="#">Customer Management</a>
          </div>
          <ul className="nav navbar-nav">
          <li><a href="/home">Home</a></li>
          <li><a href="/add">Add Customer</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}


export default Navigation;
