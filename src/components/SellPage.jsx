import React, { Component } from "react";
import Items from "./Items";
import ItemForm from "./ItemForm";
import ListingForm from "./ListingForm";

class SellPage extends Component {
    render() {
        return (
          <div className="container">
            <h1 align="center">What do you want to sell today?</h1>
            <Items />
            <ItemForm />
            <ListingForm email={this.props.email}/>
          </div>
        );
    }
}

export default SellPage;