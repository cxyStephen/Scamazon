import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

class AccountPage extends Component {
  render() {
    if (this.props.email.length === 0) return <Redirect to="/user" />;
    return (
      <Container>
        <div>You are currently logged in as '{this.props.email}'</div>
        <Row className="justify-content-md-center">
          <NavLink to="account/type">Account type</NavLink>
        </Row>
        <Row className="justify-content-md-center">
          <NavLink to="account/address">Your addresses</NavLink>
        </Row>
        <Row className="justify-content-md-center">
          <NavLink to="account/payment">Your payment methods</NavLink>
        </Row>
      </Container>
    );
  }
}

export default AccountPage;
