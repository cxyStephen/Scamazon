import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

const API = "http://85c320be.ngrok.io/";
const CREATE_LISTING_ENDPOINT = "create_listing";

class ListingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      seller: "",
      quantity: "",
      price: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = JSON.stringify({
      item: this.state.item,
      seller: this.state.seller,
      quantity: this.state.quantity,
      price: this.state.price
    });
    fetch(API + CREATE_LISTING_ENDPOINT, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: data
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.success + "\n" + data.message);
        if (data.success) {
          alert("A new listing was created.");
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
                type="text"
                value={this.state.item}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Seller:
              <input
                className="form-control"
                name="seller"
                type="text"
                value={this.state.seller}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Quantity:
              <input
                className="form-control"
                name="quantity"
                type="text"
                value={this.state.quantity}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Price:
              <input
                className="form-control"
                name="price"
                type="text"
                value={this.state.price}
                onChange={this.handleInputChange}
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
