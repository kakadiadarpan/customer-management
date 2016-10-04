import AddCustomerForm from '../components/addcustomer.js';
import { addUser, addUserSuccess, addUserFailure } from '../actions/UsersAction';
import { reduxForm, reset } from 'redux-form';

const validate = (values) => {
  var errors = {};
  var hasErrors = false;
  var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter valid email';
    hasErrors = true;
  }
  if (values.email && !emailRegex.test(values.email)) {
    hasErrors = true;
    errors.email = 'Enter valid email';
  }
  return hasErrors && errors;
};

const validateAndAddUser = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(addUser(values))
    .then((response) => {
      let data = response.payload.data;
      if ( response.payload.status != 200 ) {
        dispatch(addUserFailure(response.payload));
        reject(data);
      } else if ( response.payload.status == 200 ) {
        dispatch(addUserSuccess(response.payload));
        resolve();
        dispatch( reset('AddCustomerForm') );
      }
    });
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCustomer: validateAndAddUser,
  }
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'AddCustomerForm',//Unique form name
  fields: ['email', 'referral_id'],//Fields for client side validation
  null,//async server validation
  null,//on blur fields for async server validation
  validate
}, mapStateToProps, mapDispatchToProps)(AddCustomerForm);

