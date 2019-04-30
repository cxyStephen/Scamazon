import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";

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
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Scamazon</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/user">Sign up</Nav.Link>
            {button}
          </Nav>
          <Button>Cart</Button>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
