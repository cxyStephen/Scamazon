import React, { Component } from "react";
import Row from "react-bootstrap/Row";

class CheckoutItemLayout extends Component {
  render() {
    return (
      <tr>
        <td>
          <Row style={{ fontSize: "20px" ,fontWeight: "bold" }}>{this.props.item.item_name}</Row>
          <Row>Quantity: {this.props.item.quantity}</Row>
          <Row style={{ color: "#b12704", fontWeight: "bold" }}>${this.props.item.price/100}</Row>
          <Row style={{color: "#888"}}>Sold by: {this.props.item.seller}</Row>
        </td>
      </tr>
    );
  }
}

export default CheckoutItemLayout;
