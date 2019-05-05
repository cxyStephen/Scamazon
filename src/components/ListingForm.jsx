import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import API from "../constants";

class ListingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      seller: this.props.email,
      quantity: "",
      price: ""
    };
  }

  handleInputChange = e => {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const new_price = this.state.price * 100;
    const data = JSON.stringify({
      item: this.state.item,
      seller: this.state.seller,
      quantity: this.state.quantity,
      price: new_price
    });
    fetch(API + "/create_listing", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: data
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.success + "\n" + data.message);
      if (data.success) {
        alert("A new listing was created.");
        window.location.reload();
      } else {
        alert("Error: Could not create new listing.");
      }
    })
    .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="container">
        <h3>Create a new listing</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Item ID:
              <input
                className="form-control"
                name="item"
                type="number"
                min="1"
                step="1"
                value={this.state.item}
                onChange={this.handleInputChange}
                placeholder="Enter an Item ID"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Your Email:
              <input
                className="form-control"
                name="seller"
                type="email"
                value={this.state.seller}
                onChange={this.handleInputChange}
                readOnly
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Quantity:
              <input
                className="form-control"
                name="quantity"
                type="number"
                min="1"
                step="1"
                value={this.state.quantity}
                onChange={this.handleInputChange}
                placeholder="Enter a number"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Price: $
              <input
                className="form-control"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={this.state.price}
                onChange={this.handleInputChange}
                placeholder="Enter a price"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ListingForm;
