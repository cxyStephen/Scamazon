import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import API from "../constants";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class PaymentPage extends Component {
  state = {
    payments: "",
    isLoading: true,
    error: "",
    selectedPayments: []
  };

  componentDidMount() {
    const url = API + "/get_payments?";
    const email = this.props.email;
    if (email.length === 0) return;
    const query = "user=" + email;
    console.log(url + query);
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
    let table, deleteButton;

    if (this.state.selectedPayments.length === 0)
      deleteButton = (
        <Button variant="danger" disabled>
          Delete Payment Methods
        </Button>
      );
    else
      deleteButton = (
        <Button variant="danger" onClick={this.handleDelete}>
          Delete Payment Methods
        </Button>
      );

    if (!this.state.isLoading /*&& this.state.payments.length > 0*/) {
      table = (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th />
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
                  <td>
                    <Form.Group
                      controlId={data.payment_id}
                      onChange={this.handleSelect}
                    >
                      <Form.Check type="checkbox" />
                    </Form.Group>
                  </td>
                  <td>{data.payment_type}</td>
                  <td>{data.payment_key}</td>
                  <td>{data.exp_date}</td>
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
        <Row>
          <Col>{deleteButton}</Col>
          <Col>
            <NavLink to="payment/new">Add a payment method</NavLink>
          </Col>
        </Row>
        {table}
      </div>
    );
  }

  handleDelete = () => {
    const url = API + "/modify_payment";
    const email = this.props.email;
    let { selectedPayments } = this.state;
    let change = false;
    let deleted = [];
    let promises = [];

    selectedPayments.forEach(x =>
      promises.push(
        fetch(url, {
          method: "DELETE",
          body: JSON.stringify({ id: x, user: email }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(response => {
            console.log(response.success + "\n" + response.message);
            if (response.success) {
              change = true;
              deleted.push(x);
            }
          })
          .catch(error => console.error(error))
      )
    );

    Promise.all(promises).then(() => {
      let newPayments = this.state.payments;
      if (change) {
        newPayments = this.state.payments.filter(
          x => !deleted.includes(x.payment_id.toString())
        );
      }
      this.setState({
        payments: newPayments,
        error:
          deleted.length !== selectedPayments.length
            ? "Failed to delete one or more payment methods"
            : ""
      });
    });
  };

  handleSelect = e => {
    let { selectedPayments } = this.state;
    if (e.target.checked) selectedPayments.push(e.target.id);
    else selectedPayments.splice(selectedPayments.indexOf(e.target.id), 1);
    this.setState({ selectedPayments });
  };
}

export default PaymentPage;
