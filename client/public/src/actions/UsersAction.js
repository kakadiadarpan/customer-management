import axios from 'axios';
import querystring from 'querystring';
import { Link } from 'react-router';

export const SERVER_ADDRESS = 'http://localhost:3001';
//ADD user
export const ADD_USER = 'ADD_USER';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
//Get Customer
export const GET_CUSTOMERS = 'GET_CUSTOMERS';
export const GET_CUSTOMERS_FAILURE = 'GET_CUSTOMERS_FAILURE';
export const GET_CUSTOMERS_SUCCESS = 'GET_CUSTOMERS_SUCCESS';
//Get Customer By Id
export const GET_CUSTOMERBYID = 'GET_CUSTOMERBYID';
export const GET_CUSTOMERBYID_FAILURE = 'GET_CUSTOMERBYID_FAILURE';
export const GET_CUSTOMERBYID_SUCCESS = 'GET_CUSTOMERBYID_SUCCESS';
//Get Already Referred customersData
export const GET_CUSTOMERS_FOR_REFERRAL = 'GET_CUSTOMERBYID';
export const GET_CUSTOMERS_FOR_REFERRAL_FAILURE = 'GET_CUSTOMERS_FOR_REFERRAL_FAILURE';
export const GET_CUSTOMERS_FOR_REFERRAL_SUCCESS = 'GET_CUSTOMERS_FOR_REFERRAL_SUCCESS';
//Get customersData without referral code
export const GET_REFERRED_CUSTOMERS = 'GET_REFERRED_CUSTOMERS';
export const GET_REFERRED_CUSTOMERS_FAILURE = 'GET_REFERRED_CUSTOMERS_FAILURE';
export const GET_REFERRED_CUSTOMERS_SUCCESS = 'GET_REFERRED_CUSTOMERS_SUCCESS';

export const ADD_CHILDREN = 'ADD_CHILDREN';
export const ADD_CHILDREN_FAILURE = 'ADD_CHILDREN_FAILURE';
export const ADD_CHILDREN_SUCCESS = 'ADD_CHILDREN_SUCCESS';


const LOGIN_URL = SERVER_ADDRESS + '/api/Users/login';
const ADD_CUSTOMER_URL = SERVER_ADDRESS + '/api/Customers/addCustomer';
const GET_CUSTOMER_URL = SERVER_ADDRESS + '/api/Customers/fetchAllCustomersWithReferralCount?sortFlag=-1';

const GET_CUSTOMERBYID_URL = SERVER_ADDRESS + '/api/Customers/getCustomerById?customer_id=';
const GET_CUSTOMERS_FOR_REFERRAL_URL = SERVER_ADDRESS + '/api/Customers/fetchUnreferredCustomers?customer_id=';
const GET_REFERRED_CUSTOMERS_URL = SERVER_ADDRESS + '/api/Customers/fetchAllChildren?customer_id=';

const ADD_CHILDREN_URL = SERVER_ADDRESS + '/api/Customers/addReferral';

export function addUser(formValues) {
  const request = axios.post(`${ADD_CUSTOMER_URL}`, formValues, { headers: { 'Content-Type': 'application/json' } }
);

return {
  type: ADD_USER,
  payload: request
};
}

export function addUserSuccess(user) {
  return {
    type: ADD_USER_SUCCESS,
    payload: user
  };
}

export function addUserFailure(error) {
  return {
    type: ADD_USER_FAILURE,
    payload: error
  };
}
//get all customersData
export function getCustomers() {
  const request = axios.get(`${GET_CUSTOMER_URL}`, { headers: { 'Content-Type': 'application/json' } }
  );
  return {
    type: GET_CUSTOMERS,
    payload: request
  };
}

export function getCustomersSuccess(user) {
  return {
    type: GET_CUSTOMERS_SUCCESS,
    payload: user
  };
}

export function getCustomersFailure(error) {
  return {
    type: GET_CUSTOMERS_FAILURE,
    payload: error
  };
}
//get customer by id
export function getCustomerById(customer_id) {
  const request = axios.get(`${GET_CUSTOMERBYID_URL}`+customer_id, { headers: { 'Content-Type': 'application/json' } }
  );
  return {
    type: GET_CUSTOMERBYID,
    payload: request
  };
}

export function getCustomerByIdSuccess(user) {
  return {
    type: GET_CUSTOMERBYID_SUCCESS,
    payload: user
  };
}

export function getCustomerByIdFailure(error) {
  return {
    type: GET_CUSTOMERBYID_FAILURE,
    payload: error
  };
}

//Get Already Referred customersData
export function getReferredCustomers(customer_id) {
  const request = axios.get(`${GET_REFERRED_CUSTOMERS_URL}`+customer_id, { headers: { 'Content-Type': 'application/json' } }
  );
  return {
    type: GET_REFERRED_CUSTOMERS,
    payload: request
  };
}

export function getReferredCustomersSuccess(user) {
  return {
    type: GET_REFERRED_CUSTOMERS_SUCCESS,
    payload: user
  };
}

export function getReferredCustomersFailure(error) {
  return {
    type: GET_REFERRED_CUSTOMERS_FAILURE,
    payload: error
  };
}

//Get customersData without referral code
export function getCustomersForReferral(customer_id) {
  const request = axios.get(`${GET_CUSTOMERS_FOR_REFERRAL_URL}`+customer_id, { headers: { 'Content-Type': 'application/json' } }
  );
  return {
    type: GET_CUSTOMERS_FOR_REFERRAL,
    payload: request
  };
}

export function getCustomersForReferralSuccess(user) {
  return {
    type: GET_CUSTOMERS_FOR_REFERRAL_SUCCESS,
    payload: user
  };
}

export function getCustomersForReferralFailure(error) {
  return {
    type: GET_CUSTOMERS_FOR_REFERRAL_FAILURE,
    payload: error
  };
}

export function addChildren(childrenIds, customer_id) {
  let formData = {
    'childrenIds': childrenIds,
    'customer_id': customer_id,
  }
  const request = axios.post(`${ADD_CHILDREN_URL}`, formData,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return {
    type: ADD_CHILDREN,
    payload: request
  };
}

export function addChildrenSuccess(user) {
  return {
    type: ADD_CHILDREN_SUCCESS,
    payload: user
  };
}

export function addChildrenFailure(error) {
  return {
    type: ADD_CHILDREN_FAILURE,
    payload: error
  };
}
