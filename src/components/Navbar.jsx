import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import NavLink from "react-bootstrap/NavLink";

const divStyle = {
  padding: "8px"
};

class NavBar extends Component {
  render() {
    let logoutButton = null;
    let sellLink = null;
    let cartButton = null;
    let myListingsLink = null;
    let myOrdersLink = null;

    if (this.props.isLoggedIn)
      logoutButton = (
        <Button style={divStyle} onClick={this.props.onLogout}>
          Logout
        </Button>
      );

    if (this.props.isCustomer) {
      myOrdersLink = (
        <LinkContainer to="/myOrders">
          <NavLink>My Orders</NavLink>
        </LinkContainer>
      );
      cartButton = (
        <LinkContainer to="/cart">
          <Button>Cart</Button>
        </LinkContainer>
      );
    }

    if (this.props.isSeller) {
      sellLink = (
        <LinkContainer to="/sell">
          <NavLink>Sell</NavLink>
        </LinkContainer>
      );
      myListingsLink = (
        <LinkContainer to="/mylistings">
          <NavLink>My Listings</NavLink>
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
        <LinkContainer to="/">
          <Navbar.Brand>Scamazon</Navbar.Brand>
        </LinkContainer>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/user">
              <NavLink>Account</NavLink>
            </LinkContainer>
            {sellLink}
            {myListingsLink}
            {myOrdersLink}
            {logoutButton}
          </Nav>
        </Navbar.Collapse>
        {cartButton}
      </Navbar>
    );
  }
}

export default NavBar;
