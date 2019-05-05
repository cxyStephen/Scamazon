import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

const divStyle = {
  padding: "8px"
};

class NavBar extends Component {
  render() {
    let button = null;
    if (this.props.isLoggedIn)
      button = (
        <Button style={divStyle} onClick={this.props.onLogout}>
          Logout
        </Button>
      );
    else {
      button = null;
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
            {button}
          </Nav>
          <LinkContainer to="/cart">
            <Button>Cart</Button>
          </LinkContainer>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
