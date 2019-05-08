import React, { Component } from "react";
import API from "../constants";
import CurrencyInput from "react-currency-masked-input";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";

class ListingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.match.params.item_id,
      seller: this.props.email,
      quantity: "",
      price: "", 
      success: false, 
      message: ""
    };
  };

  handleInputChange = (e, maskedValue) => {
    const target = e.target;
    if (target.name === "quantity") {
      this.setState({
        [target.name]: target.value
      });
    } else if (target.name === "price") {
      this.setState({
        [target.name]: maskedValue
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const priceInCents = this.state.price * 100;
    const data = JSON.stringify({
      item: this.state.item,
      seller: this.state.seller,
      quantity: this.state.quantity,
      price: priceInCents
    });
    fetch(API + "/create_listing", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: data
    })
    .then(response => response.json())
    .then(data => {
      this.setState({success: data.success});
      this.setState({message: data.message});
      console.log(data.success + "\n" + data.message);
      /*
      if (data.success) {
        this.props.history.push("/sell");
      }
      */
    })
    .catch(error => console.error(error));
  };

  render() {
    let errorAlert;
    let listingCreated;
    if (this.state.success)
      listingCreated = <Badge pill variant="success">Listing Created</Badge>
    else if (this.state.message.length > 0)
      errorAlert = <Alert variant="danger" size="sm">{this.state.message}</Alert>;

    return (
      <div className="container">
        <h3>Create a new listing</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>
              Item ID:
              <Form.Control
                name="item"
                value={this.state.item}
                onChange={this.handleInputChange}
                readOnly
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Quantity:
              <Form.Control
                name="quantity"
                type="number"
                min="1"
                step="1"
                value={this.state.quantity}
                onChange={this.handleInputChange}
                placeholder="Enter a quantity"
                required
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Price ($): 
              <CurrencyInput
                className="form-control"
                name="price"
                value={this.state.price}
                onChange={this.handleInputChange}
                placeholder="Enter a price"
                required
              />
            </Form.Label>
          </Form.Group>
          <Button 
            type="submit" 
            variant="primary"
          >
            Submit
          </Button>
        </Form>
        {listingCreated}
        {errorAlert}
      </div>
    );
  }
}

export default ListingForm;

