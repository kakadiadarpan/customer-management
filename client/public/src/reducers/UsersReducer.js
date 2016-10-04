import { ADD_USER, ADD_USER_SUCCESS, ADD_USER_FAILURE, GET_CUSTOMERS, GET_CUSTOMERS_SUCCESS, GET_CUSTOMERS_FAILURE, GET_CUSTOMERBYID, GET_CUSTOMERBYID_SUCCESS, GET_CUSTOMERBYID_FAILURE, GET_CUSTOMERS_FOR_REFERRAL, GET_CUSTOMERS_FOR_REFERRAL_SUCCESS, GET_CUSTOMERS_FOR_REFERRAL_FAILURE, GET_REFERRED_CUSTOMERS, GET_REFERRED_CUSTOMERS_SUCCESS, GET_REFERRED_CUSTOMERS_FAILURE, ADD_CHILDREN, ADD_CHILDREN_SUCCESS, ADD_CHILDREN_FAILURE } from '../actions/UsersAction';

const INITIAL_STATE = {data: null, status: null, error: null, type: null };

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case ADD_USER:
    return { ...state, data: null, status:'adding', error:null, type: null };

    case ADD_USER_SUCCESS:
    return { ...state, data: null, status:'success', error:null, type: null };

    case ADD_USER_FAILURE:
    error = action.payload.data || {message: action.payload.message};
    return { ...state, data: null, status:'failure', error:error, loading: false, type: null};

  case GET_CUSTOMERS:
  return { ...state, data: null, status:'fetching', error:null, type: null };

  case GET_CUSTOMERS_SUCCESS:
  return { ...state, data: action.payload.data, status:'success', error:null, type: null };

  case GET_CUSTOMERS_FAILURE:
  error = action.payload.data || {message: action.payload.message};
  return { ...state, data: null, status:'failure', error:error, loading: false, type: null};

  case GET_CUSTOMERBYID:
  return { ...state, data: null, status:'fetchingcustomerid', error:null, type: null };

  case GET_CUSTOMERBYID_SUCCESS:
  return { ...state, data: action.payload.data, status:'successcustomerbyid', error:null, type: 'customerbyiddata' };

  case GET_CUSTOMERBYID_FAILURE:
  error = action.payload.data || {message: action.payload.message};
  return { ...state, data: null, status:'failurecustomerbyid', error:error, loading: false, type: null};

  case GET_CUSTOMERS_FOR_REFERRAL:
  return { ...state, data: null, status:'fetchingcustomersforreferral', error:null, type: null };

  case GET_CUSTOMERS_FOR_REFERRAL_SUCCESS:
  return { ...state, data: action.payload.data, status:'successcustomersforreferral', error:null, type: 'customersforreferraldata' };

  case GET_CUSTOMERS_FOR_REFERRAL_FAILURE:
  error = action.payload.data || {message: action.payload.message};
  return { ...state, data: null, status:'failurecustomersforreferral', error:error, loading: false, type: null};

  case GET_REFERRED_CUSTOMERS:
  return { ...state, data: null, status:'fetchingreferredcustomers', error:null, type: null };

  case GET_REFERRED_CUSTOMERS_SUCCESS:
  return { ...state, data: action.payload.data, status:'successreferredcustomers', error:null, type: 'referredcustomersdata' };

  case GET_REFERRED_CUSTOMERS_FAILURE:
  error = action.payload.data || {message: action.payload.message};
  return { ...state, data: null, status:'failurereferredcustomers', error:error, loading: false, type: null};

  case ADD_CHILDREN:
  return { ...state, data: null, status:'addingchildren', error:null, type: null };

  case ADD_CHILDREN_SUCCESS:
  return { ...state, data: action.payload.data, status:'childrenadded', error:null, type: null };

  case ADD_CHILDREN_FAILURE:
  error = action.payload.data || {message: action.payload.message};
  return { ...state, data: null, status:'addingchildrenfailed', error:error, loading: false, type: null};

    default:
    return state;
  }
}
