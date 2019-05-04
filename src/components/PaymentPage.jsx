import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import API from "../constants";
import Table from "react-bootstrap/Table";

class PaymentPage extends Component {
  state = {
    payments: "",
    isLoading: true,
    error: ""
  };

  componentDidMount() {
    const url = API + "/get_payments?";
    const email = this.props.email;
    if (email.length === 0) return;
    const query = "user=" + email;
    fetch(url + query)
      .then(res => res.json())
      .then(response => {
        this.setState({ payments: response.payments, isLoading: false });
        console.log(
          "get_payments: \n" + response.success + "\n" + response.message
        );
        if (!response.success) {
          this.setState({ error: response.message });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    if (this.props.email.length === 0) return <Redirect to="/user" />;
    let table;
    if (!this.state.isLoading /*&& this.state.payments.length > 0*/) {
      table = (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Payment Type</th>
              <th>Key</th>
              <th>Expiration Date</th>
              {/*<th>Billing Address</th>*/}
            </tr>
          </thead>
          <tbody>
            {this.state.payments.map(data => {
              return (
                <tr key={data.payment_id}>
                  <td>{data.payment_type}</td>
                  <td>{data.payment_key}</td>
                  <td>{data.exp_date}</td>
                  {/*<td>{data.billing_address}</td>*/}
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }
    return (
      <div>
        <h1>Payments</h1>
        <NavLink to="payment/new">Add a payment method</NavLink>
        {table}
      </div>
    );
  }
}

export default PaymentPage;
