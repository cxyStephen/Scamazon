import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import API from "../constants";

class AddToCart extends Component {
    state = {
        success: false,
        message: ""
      };
    constructor(...args) {
        super(...args);

        this.addToCart = () => {
            const url = API + "/add_to_cart";
            const data = JSON.stringify({
                email: this.props.email,
                item: this.props.item,
                seller: this.props.seller,
                quantity: parseInt(this.refs.quantity.value, 10)
            });
            fetch(url, {
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => response.json())
            .then(data => {
                this.setState({success: data.success});
                this.setState({message: data.message});
            })
            .catch(error => console.error(error));
        };
    }

  render() {
    let errorAlert;
    let added;
    if (this.state.success)
      added = <Badge pill variant="success" size="sm">{"Added"}</Badge>
    else if (this.state.message.length > 0)
      errorAlert = <Alert variant="danger" size="sm">{this.state.message}</Alert>;
    
    return (
        <div>
        <InputGroup className="mb-3">
            <FormControl size="sm" defaultValue="1" ref="quantity"/>
            <InputGroup.Append>
            <Button size="sm" onClick={this.addToCart}>🛒</Button>
            </InputGroup.Append>
        </InputGroup>
        {errorAlert}
        {added}
        </div>
    );
  }
}

export default AddToCart;