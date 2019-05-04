import React, { Component } from "react";
import Listings from "./Listings";

class Marketplace extends Component {
  render() {
    return (
      <div className="container">
        <h1 align="center">Scamazon Marketplace</h1>
        <Listings />
      </div>
    );
  }
}

export default Marketplace;
