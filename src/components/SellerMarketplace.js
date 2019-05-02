import React, { Component } from 'react';
import Listings from './Listings';
import ListingForm from './ListingForm';
import Items from './Items';
import ItemForm from './ItemForm';

class SellerMarketplace extends Component {
  render() {
    return (
      <div className="container">
        <h1 align="center" >Welcome to the SCAMAZON Marketplace!</h1>
        <Items />
        <Listings />
        <div className="container row">
            <div className="column">
                <ItemForm />
            </div>
            <div className="column">
                <ListingForm />
            </div>
        </div>
      </div>
    );
  }
}

export default SellerMarketplace;
