import React, { Component } from 'react';
import { connect } from 'react-redux';
import Details from '../components/details.js';
import {getCustomerById, getCustomerByIdFailure, getCustomerByIdSuccess, getCustomersForReferral,getCustomersForReferralSuccess, getCustomersForReferralFailure, getReferredCustomers, getReferredCustomersSuccess,getReferredCustomersFailure, addChildren, addChildrenFailure, addChildrenSuccess } from '../actions/UsersAction';

const mapDispatchToProps = (dispatch) => {
  return {
      getCustomerById : (customer_id) => {
        dispatch(getCustomerById(customer_id))
        .then((response) => {
          let data = response.payload.data;
          if( ( response.payload.data.response && response.payload.data.response.status != 200) || response.payload.data.error ) {
            dispatch(getCustomerByIdFailure(response.payload));
          } else {
            dispatch(getCustomerByIdSuccess(response.payload));
          }
        });
      },
      getCustomersForReferral : (customer_id) => {
        dispatch(getCustomersForReferral(customer_id))
        .then((response) => {
          let data = response.payload.data;
          if(( response.payload.data.response && response.payload.data.response.status != 200) || response.payload.data.error ) {
            dispatch(getCustomersForReferralFailure(response.payload));
          } else {
            dispatch(getCustomersForReferralSuccess(response.payload));
          }
        });
      },
      getReferredCustomers : (customer_id) => {
        dispatch(getReferredCustomers(customer_id))
        .then((response) => {
          let data = response.payload.data;
          if(( response.payload.data.response && response.payload.data.response.status != 200) || response.payload.data.error ) {
            dispatch(getReferredCustomersFailure(response.payload));
          } else {
            dispatch(getReferredCustomersSuccess(response.payload));
          }
        });
      },
      addChildren : (childrenIds, customer_id) => {
        console.log(childrenIds+' ' +customer_id);
        dispatch(addChildren(childrenIds, customer_id))
        .then((response) => {
          let data = response.payload.data;
          if(( response.payload.data.response && response.payload.data.response.status != 200) || response.payload.data.error ) {
            dispatch(addChildrenFailure(response.payload));
          } else {
            dispatch(addChildrenSuccess(response.payload));
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

export default connect(mapStateToProps, mapDispatchToProps)(Details);
