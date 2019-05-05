import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

const divStyle = {
  padding: "8px"
};

class NavBar extends Component {
  render() {
    let logoutButton = null;
    let sellLink = null;
    let cartButton = null;

    if (this.props.isLoggedIn)
      logoutButton = (
        <Button style={divStyle} onClick={this.props.onLogout}>
          Logout
        </Button>
      );

    if (this.props.isCustomer) {
      cartButton = (
        <LinkContainer to="/cart">
          <Button>Cart</Button>
        </LinkContainer>
      );
    }

    if (this.props.isSeller) {
      sellLink = (
        <LinkContainer to="/sell">
          <Nav.Link>Sell</Nav.Link>
        </LinkContainer>
      );
    }

    return (
      <Navbar
        bg="light"
        expand="lg"
        style={{
          position: "relative",
          top: "50%"
        }}
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <LinkContainer to="/">
          <Navbar.Brand>Scamazon</Navbar.Brand>
        </LinkContainer>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/user">
              <Nav.Link>Account</Nav.Link>
            </LinkContainer>
            {sellLink}
            {logoutButton}
          </Nav>
        </Navbar.Collapse>
        {cartButton}
      </Navbar>
    );
  }
}

export default NavBar;
