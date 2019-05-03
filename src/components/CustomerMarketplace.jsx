import React, { Component } from "react";
import Listings from "./Listings";
import ListingForm from "./ListingForm";
import Items from "./Items";
import ItemForm from "./ItemForm";


class CustomerMarketplace extends Component {
  render() {
    return (
      <div className="container">
        <h1 align="center">Welcome to the SCAMAZON Marketplace!</h1>
        <Listings />
        <ListingForm onSubmit={this.props.history} />
        <Items />
        <ItemForm />
      </div>
    );
  }
}

export default CustomerMarketplace;
