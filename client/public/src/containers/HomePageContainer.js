import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePage from '../components/homepage.js';
import {getCustomers, getCustomersFailure, getCustomersSuccess } from '../actions/UsersAction';

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomers : () => {
      //console.log(dispatch);
      dispatch(getCustomers())
      .then((response) => {
        let data = response.payload.data;
        //if any one of these exist, then there is a field error
        if(response.payload.status != 200 || response.payload.data.customer_id == "") {
          //let other components know of error by updating the redux` state
          //reject(data);
          dispatch(getCustomersFailure(response.payload));
        } else {
          //resolve();
          dispatch(getCustomersSuccess(response.payload));
        }
      });
    }
  }
};

function mapStateToProps(state) {
    return {
      user: state.user
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
