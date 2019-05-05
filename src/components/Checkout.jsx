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
    error: ""
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
            subtotalPrice: data.subtotal/100
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
    console.log(url + query);
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
    let error =
      this.state.error.length > 0 ? <Alert>{this.state.error}</Alert> : null;
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
                    <Form>
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
                        {this.state.shipTypes.map(data => {
                          return (
                            <Col key={data.company + data.speed}>
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
                            </Col>
                          );
                        })}
                      </Form.Group>
                      <hr />
                      <h4>Order Summary</h4>
                      <div>Subtotal: ${this.state.subtotalPrice}</div>
                      <div>Shipping: ${this.state.shippingPrice}</div>
                      <div style={{ color: "#b12704", fontWeight: "bold" }}>
                        Order total: ${this.state.totalPrice}
                      </div>
                      <Button variant="success" className="m-md-3">
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
}

export default Checkout;
