import React, { Component } from "react";
import API from "../constants";
import Alert from "react-bootstrap/Alert";
import CheckoutItemLayout from "./CheckoutItemLayout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

class Checkout extends Component {
  state = {
    items: [],
    totalPrice: "--",
    subtotalPrice: "",
    shippingPrice: "--",
    shipCompany: "",
    shipSpeed: "",
    paymentID: "",
    addressID: "",
    addresses: [],
    payments: [],
    shipTypes: [],
    error: "",
    purchasedCart: false
  };

  componentDidMount() {
    this.getCartItems();
    this.getAddresses();
    this.getPayments();
    this.getShipTypes();
  }

  getCartItems = () => {
    const path = "/get_cart";
    const query = "?user=" + this.props.email;
    if (query.length === 6) return;
    fetch(API + path + query)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.setState({
            items: data.contents,
            subtotalPrice: data.subtotal / 100
          });
        } else {
          this.setState({ error: data.message });
        }
      })
      .catch(error => console.error(error));
  };

  getAddresses = () => {
    const url = API + "/get_addresses?";
    const email = this.props.email;
    if (email.length === 0) return;
    const query = "user=" + email;
    fetch(url + query)
      .then(res => res.json())
      .then(response => {
        this.setState({ addresses: response.addresses });
        if (!response.success) {
          this.setState({ error: response.message });
        }
      })
      .catch(error => console.error(error));
  };

  getPayments = () => {
    const url = API + "/get_payments?";
    const email = this.props.email;
    if (email.length === 0) return;
    const query = "user=" + email;
    fetch(url + query)
      .then(res => res.json())
      .then(response => {
        this.setState({ payments: response.payments });
        if (!response.success) this.setState({ error: response.message });
      })
      .catch(error => console.error(error));
  };

  getShipTypes = () => {
    const url = API + "/get_shiptypes";
    fetch(url)
      .then(res => res.json())
      .then(response => {
        this.setState({ shipTypes: response.shiptypes });
        if (!response.success) this.setState({ error: response.message });
      })
      .catch(error => console.error(error));
  };
  render() {
    if (this.state.purchasedCart) return <Redirect to="/" />;
    let error =
      this.state.error.length > 0 ? (
        <Alert variant="danger">{this.state.error}</Alert>
      ) : null;
    return (
      <Container>
        {error}
        <h1>Checkout</h1>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Order Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="addressID">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="select" onChange={this.handleChange}>
                          <option value="">Choose</option>
                          {this.state.addresses.map(data => {
                            return (
                              <option
                                value={data.address_id}
                                key={data.address_id}
                              >
                                {data.address}&emsp;
                                {data.city}, {data.state} &emsp;
                                {data.zip}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                      <hr />
                      <Form.Group controlId="paymentID">
                        <Form.Label>Payment Method</Form.Label>
                        <Form.Control as="select" onChange={this.handleChange}>
                          <option value="">Choose</option>
                          {this.state.payments.map(data => {
                            return (
                              <option
                                value={data.payment_id}
                                key={data.payment_id}
                              >
                                {data.payment_type}:&nbsp;{data.payment_key}
                                &emsp;&emsp; Expiration Date:&nbsp;
                                {data.exp_date}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Form.Group>
                      <hr />
                      <Form.Group>
                        <Form.Label as="legend">
                          Shipping Company and Speed
                        </Form.Label>
                        <table align="center" className="table-borderless table-sm">
                            <tbody>
                          {this.state.shipTypes.map(data => {
                            return (
                              <tr align="left" key={data.company + data.speed}>
                                <td >
                                  <Form.Check
                                    type="radio"
                                    name="formHorizontalRadios"
                                    label={
                                      " $ " +
                                      data.price / 100 +
                                      " " +
                                      data.company +
                                      " " +
                                      data.speed
                                    }
                                    id={data.company + data.speed}
                                    speed={data.speed}
                                    onChange={e =>
                                      this.handleShipmentChange(
                                        e,
                                        data.company,
                                        data.speed,
                                        data.price
                                      )
                                    }
                                  />
                                </td>
                              </tr>
                            );
                          })}
                            </tbody>
                        </table>
                      </Form.Group>
                      <hr />
                      <h4>Order Summary</h4>
                      <table align="center">
                        <tbody>
                          <tr align="left">
                            <td>Subtotal: ${this.state.subtotalPrice}</td>
                          </tr>
                          <tr align="left">
                            <td>Shipping: ${this.state.shippingPrice}</td>
                          </tr>
                          <tr align="left">
                            <td
                              style={{ color: "#b12704", fontWeight: "bold" }}
                            >
                              Order total: ${this.state.totalPrice}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <Button
                        variant="success"
                        className="m-md-3"
                        type="submit"
                      >
                        Place order
                      </Button>
                    </Form>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md="auto">
            <Table>
              <thead>
                <tr>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map(item => (
                  <CheckoutItemLayout key={item.item_id} item={item} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  handleShipmentChange = (e, company, speed, price) => {
    const shipPrice = price / 100;
    const total = this.state.subtotalPrice + shipPrice;
    this.setState({
      shipCompany: company,
      shipSpeed: speed,
      shippingPrice: shipPrice,
      totalPrice: total
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.isValidForm()) {
      this.setState({ error: "Did you fill out the order information form?" });
      return;
    }
    const data = JSON.stringify({
      email: this.props.email,
      payment_id: this.state.paymentID,
      address_id: this.state.addressID,
      ship_company: this.state.shipCompany,
      ship_speed: this.state.shipSpeed
    });
    const url = API + "/purchase_cart";
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(
          response.success +
            "\n" +
            response.num_shipments +
            "\n" +
            response.subtotal_cost +
            "\n" +
            response.ship_cost
        );
        if (response.success) this.setState({ purchasedCart: true });
        else if (!response.success) this.setState({ error: response.message });
      })
      .catch(error => console.error(error));
  };

  isValidForm = () => {
    let isValid = true;
    Object.keys(this.state)
      .filter(key => key !== "error" && key !== "purchasedCart")
      .forEach(i => {
        if (i === "items" && i.length === 0) {
          this.setState({ error: "You can't checkout an empty cart" });
          isValid = false;
        } else if (this.state[i].length === 0) {
          isValid = false;
          console.log(i);
        }
      });
    return isValid;
  };
}

export default Checkout;
