import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
let customerDataById = '';
let referralCustomersData = [];
let referredCustomersData = [];
let statusMessage = { text : '' };
let customer_id = '';
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
        childrenIds: []
      }
      this.changeHandler = this.changeHandler.bind(this);
    customer_id = this.props.children.customer_id;
  }
  changeHandler(e){
    this.setState({
      childrenIds: e
    });
  }
  componentDidMount() {
    this.props.getCustomerById( customer_id );
    this.props.getCustomersForReferral( customer_id );
    this.props.getReferredCustomers( customer_id );
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user.type === 'customerbyiddata') {
      customerDataById = nextProps.user.data.response.data;
    }
    if(nextProps.user.type === 'customersforreferraldata') {
      referralCustomersData = nextProps.user.data.response.data;
    }
    if(nextProps.user.type === 'referredcustomersdata') {
      referredCustomersData = nextProps.user.data.response.data;
    }
    if (nextProps.user.status === 'failure') {
      statusMessage.text='Please try again after sometime!';
    }
    if (nextProps.user.status === 'childrenadded') {
      this.props.getCustomersForReferral( customer_id );
      this.props.getReferredCustomers( customer_id );
    }

  }
  render() {
    let rcData  =  <div style = {{ color: 'red' }}>No Referred Customers Found</div>;
    let rlcData =  <div style = {{ color: 'red' }}>No Customers Found For Referral</div>;
    if( referredCustomersData.length ){
      rcData = <table className = "table">
            <thead>
              <tr>
              <th>Customer Id</th>
              <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {
                referredCustomersData.map( (customer, index) => {
                  return(
                    <tr key = { index }>
                      <td>{customer.customer_id}</td>
                      <td>{customer.email}</td>
                    </tr>
                  )
                })
              }
            </tbody>
           </table>
    }
    if( referralCustomersData.length ){
      rlcData = <CheckboxGroup name="childrens" value = {this.state.childrenIds} onChange = {this.changeHandler}>
      {
        referralCustomersData.map( (customer, index) => {
          return(
            <div key = { index } style = {{ display:'block'}}>
            <label><Checkbox value={customer.customer_id}/> {customer.email}</label>
            </div>
          )
        })
      }
      </CheckboxGroup>
    }
    return (
      <div style={{ paddingLeft : '5%'}}>
        <div >
          <p>Email : {customerDataById.email}</p>
          <p>Payback : {customerDataById.payback}</p>
          <p>Referral Id : {customerDataById.referral_id || '--' }</p>
          <p>Referral Count : {customerDataById.referral_count || '0' }</p>
        </div>
        <h3 >Customers Referred</h3>
        <div style={{width:'50%',paddingLeft:'5%'}}>
          { rcData }
        </div>
        <h3>Refer New Customers</h3>
        <div style={{width:'50%',paddingLeft:'5%'}}>
          { rlcData }
        </div>
        <div style={{marginTop: 20}}>
              <button className='btn btn-primary'  disabled = { !referralCustomersData.length || !this.state.childrenIds.length }onClick = {this.props.addChildren.bind('null', this.state.childrenIds, customerDataById.customer_id)}>Add</button>
            </div>
      </div>
    );
  }
}
export default Details;
