import React, { Component } from "react";
import Order from "./Order";
import Container from "react-bootstrap/Container";
import API from "../constants";
import { Redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

class MyOrders extends Component {
  state = {
    orders: [],
    error: ""
  };

  componentDidMount() {
    const url = API + "/get_purchases?";
    const email = this.props.email;
    if (email.length === 0) return;
    const query = "user=" + email;
    fetch(url + query)
      .then(res => res.json())
      .then(response => {
        const orders = response.purchases;
        if (orders.length === 0) {
          this.setState({ error: "Failed to retrieve your orders" });
          return;
        }
        orders.sort((a, b) => b.order_id - a.order_id);
        this.setState({ orders: orders });
      })
      .catch(error => console.error(error));
  }

  render() {
    if (this.props.email.length === 0 || this.props.isCustomer === false)
      return <Redirect to="/user" />;
    return (
      <Container>
        <h1>My Orders</h1>
        <Card>
          <ListGroup variant="flush">
            {this.state.orders.map(order => {
              return <Order details={order} key={order.order_id} />;
            })}
          </ListGroup>
        </Card>
      </Container>
    );
  }
}

export default MyOrders;
