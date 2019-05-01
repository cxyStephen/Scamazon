import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class AccountPage extends Component {
  render() {
    return (
      <main>
        <div>You are currently logged in as '{this.props.email}'</div>
        <Col>
          <Row>
            <NavLink to="account/address">Your addresses</NavLink>
          </Row>
        </Col>
      </main>
    );
  }
}

export default AccountPage;
