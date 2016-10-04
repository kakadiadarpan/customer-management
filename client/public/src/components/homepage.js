import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
let customersData = [];
let statusMessage = { text : '' };
class HomePage extends Component{
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.props.getCustomers();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user.status === 'success') {
        customersData = nextProps.user.data.response.data;
    } else if (nextProps.user.status === 'failure') { //Network connectivity issue
        statusMessage.text='Please try again after sometime!';
    }
  }
  render() {
    let cData = <div style = {{ color: 'red' }}>No Customers Data Found</div>;
    if( customersData.length ){
      cData = <table className = "table">
            <thead>
            <tr>
              <th>Customer Id</th>
              <th>Email</th>
              <th>Referral Id</th>
              <th>Referral Count</th>
              <th>Payback</th>
            </tr>
            </thead>

            <tbody>
              { customersData.map( (customer, index) => {
                  return(
                    <tr key = { index }>
                      <td><Link to={{ pathname: '/view/'+customer.customer_id}}>{customer.customer_id}</Link></td>
                      <td>{customer.email}</td>
                      <td>{customer.referral_id || '--'}</td>
                      <td>{customer.referral_count}</td>
                      <td>{customer.payback}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
    }
    return (
    <div>
      <div style={{width:'50%',paddingLeft:'20%'}}>
        { cData }
      </div>
      <div style = {{color:'red'}}>
      {statusMessage.text ? statusMessage.text : ''}
      </div>
    </div>
    );
  }
}
export default HomePage;
