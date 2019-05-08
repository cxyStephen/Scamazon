import React, { Component } from "react";
import Items from "./Items";
import { Link } from "react-router-dom";

class SellPage extends Component {
    render() {
        return (
          <div className="container">
            <h1 align="center">What do you want to sell today?</h1>
              <Items email={this.props.email} />
              <Link to="/createitem">Create a new Item</Link>
          </div>
        );
    }
}

export default SellPage;