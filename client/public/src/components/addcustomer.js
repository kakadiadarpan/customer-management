import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form'

let errorMessage = {
  text:''
}
const divStyle = {width : '50%', paddingLeft : '10%', paddingTop : '2%' }
class AddCustomer extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      email : '',
      referral_id : ''
    };
  }
  changeHandler = (propertyName, e) => {
    var state = {};
    state[propertyName] = e.target.value;
    this.setState( state );
  }

  componentWillReceiveProps(nextProps) {
    errorMessage.text='';
    console.log
    if (nextProps.user.status === 'success') {
      this.setState({email:"",referral_id:""});
    } else if (nextProps.user.status === 'failure') {
      errorMessage.text = 'Email already exists';
    } else if ( nextProps.user.error ) {
      errorMessage.text = nextProps.user.error;
    }
  }

  render() {
    const {error, errors, fields: {email, referral_id}, handleSubmit, pristine, submitting, reset } = this.props;
    return (
      <div style = {divStyle}>
      <form name="AddCustomerForm" onSubmit = {handleSubmit(this.props.addCustomer.bind(this))}>

        <div>
          <label>User name</label>
          <div>
            <input className='form-control' {...email} placeholder='example@abc.com' type='email' value = {this.state.email} onChange = {this.changeHandler.bind(this, 'email')}/>
          </div>
          <div style = {{ color: 'red' }} className='help-block'>
          { (email.touched && email.invalid) ? email.error : '' }
          </div>
        </div>
        <div>
          <label>Referral ID</label>
          <div>
            <input className='form-control' {...referral_id} placeholder='Referral ID(Optional)' type='text' value = {this.state.referral_id} onChange = {this.changeHandler.bind(this, 'referral_id')}/>
          </div>
        </div>
            <div style={{marginTop: 20}}>
              <button type="submit" className='btn btn-primary' disabled={pristine ||   submitting}>Submit</button>
            </div>
        <div style = {{ color: 'red' }} className='help-block'>
        { errorMessage.text ? errorMessage.text : '' }
        </div>
      </form>
      </div>
    );
  }
}
export default AddCustomer;
