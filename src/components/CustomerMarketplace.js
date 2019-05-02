import React, { Component } from "react";
import Listings from "./Listings";

class CustomerMarketplace extends Component {
  render() {
    return (
      <div className="container">
        <h1 align="center">Welcome to the SCAMAZON Marketplace!</h1>
        <Listings />
      </div>
    );
  }
}

export default CustomerMarketplace;
