import React, { Component } from "react";
import Items from "./Items";
import ItemForm from "./ItemForm";

class SellPage extends Component {
    render() {
        return (
          <div className="container">
            <h1 align="center">What do you want to sell today?</h1>
            <Items email={this.props.email} />
            <ItemForm />
          </div>
        );
    }
}

export default SellPage;