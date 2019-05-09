import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import API from "../constants";
import Container from "react-bootstrap/Container";
import { Redirect } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

class NewPayment extends Component {
  state = {
    type: "",
    key: "",
    exp: "",
    cvv: "",
    name: "",
    billing: "",
    userAddresses: "",
    error: "",
    createdPayment: false
  };

  componentDidMount() {
    const url = API + "/get_addresses?";
    const query = "user=" + this.props.email;
    if (query.length === 0) return;
    fetch(url + query)
      .then(res => res.json())
      .then(response => {
        this.setState({ userAddresses: response.addresses, isLoading: false });
        console.log(
          "get_addresses: \n" + response.success + "\n" + response.message
        );
        if (!response.success) {
          this.setState({ error: response.message });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    if (this.props.email.length === 0) return <Redirect to="/user" />;
    if (this.state.createdPayment)
      return <Redirect to="/user/account/payment" />;
    let errorAlert;
    if (this.state.error.length > 0)
      errorAlert = <Alert variant="danger">{this.state.error}</Alert>;
    let form;
    if (this.state.type.length > 0 && this.state.type !== "Paypal") {
      form = (
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Cardholder's name"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="key">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                placeholder="Enter card number"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="cvv">
              <Form.Label>CVV</Form.Label>
              <Form.Control placeholder="CVV" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group as={Col} controlId="exp">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control placeholder="MM/YY" onChange={this.handleChange} />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="billing">
            <Form.Label>Address</Form.Label>
            <Form.Control as="select" onChange={this.handleChange}>
              <option value="">Choose</option>
              {this.state.userAddresses.map(data => {
                return (
                  <option value={data.address_id} key={data.address_id}>
                    {data.address +
                      " " +
                      data.city +
                      " " +
                      data.state +
                      " " +
                      data.zip}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    } else if (this.state.type === "Paypal") {
      form = (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="key">
            <Form.Label>Paypal Email</Form.Label>
            <Form.Control
              placeholder="Paypal Email"
              onChange={this.handleChange}
              type="email"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    }
    return (
      <Container>
        {errorAlert}
        <Form>
          <Form.Group as={Col} controlId="type">
            <Form.Label>Form of payment</Form.Label>
            <Form.Control as="select" onChange={this.handleChange}>
              <option value="">Choose</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
              <option value="Gift">Gift Card</option>
              <option value="Paypal">Paypal</option>
            </Form.Control>
          </Form.Group>
        </Form>
        {form}
      </Container>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("SUBMIT");
    if (this.state.type !== "Paypal" && !this.isValidForm()) return;
    const url = API + "/create_payment";
    let data;
    if (this.state.type !== "Paypal") {
      data = JSON.stringify({
        type: this.state.type,
        key: this.state.key,
        exp: this.state.exp,
        cvv: this.state.cvv,
        billing: this.state.billing,
        user: this.props.email
      });
    } else {
      data = JSON.stringify({
        type: this.state.type,
        key: this.state.key,
        user: this.props.email
      });
    }
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response.success + "\n" + response.message);
        if (response.success) this.setState({ createdPayment: true });
        else if (!response.success && this._isMounted) {
          this.setState({ error: response.message });
        }
      })
      .catch(error => console.error(error));
  };

  handleChange = e => {
    e.preventDefault();
    if (
      (e.target.value === "Paypal" && this.state.type !== "Paypal") ||
      (e.target.value !== "Paypal" && this.state.type === "Paypal")
    )
      this.setState({ key: "", exp: "", cvv: "", name: "" });
    this.setState({ [e.target.id]: e.target.value });
  };

  isValidForm() {
    let type = this.state.type;
    let isValid = true;
    if (type.length > 0 && type !== "Paypal") {
      Object.keys(this.state)
        .filter(k => !k.includes("error") && !k.includes("userAddresses"))
        .forEach(e => {
          if (this.state[e] === "") {
            isValid = false;
          }
        });
      if (!this.isValidDate(this.state.exp)) return false;
      if (!isValid)
        this.setState({ error: "Please fill out all parts of the form" });
    } else {
      if (this.state.key.length === 0) {
        this.setState({ error: "Please enter a valid email address" });
        isValid = false;
      }
    }
    return isValid;
  }

  isValidDate(date) {
    let len = date.length;
    let isValid = true;
    if (len !== 5) isValid = false;
    else {
      if (date.charAt(2) !== "/") isValid = false;
      let month = date.substring(0, 2);
      let year = date.substring(3, 5);
      if (
        month.length < 2 ||
        year.length < 2 ||
        isNaN(month) ||
        isNaN(year) ||
        month < 1 ||
        month > 12
      )
        isValid = false;
    }
    if (!isValid)
      this.setState({ error: "A valid expiration date format is MM/YY" });
    return isValid;
  }
}

export default NewPayment;
