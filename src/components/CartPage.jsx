import React, { Component } from "react";
import API from "../constants";

class CartPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          contents: [],
          subtotal: "",
          quantity: "",
          error: ""
        };
      }

    componentDidMount() {
        const path = "/get_cart";
        const query = "?user=" + "sc3@example.com";
        if (query.length === 6) 
            return;
        fetch(API + path + query)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.setState({ contents: data.contents, subtotal: data.subtotal });
            }
            else {
                this.setState({ error: data.message });
            }
        })
        .catch(error => console.error(error));
    }

    render() {
        const {contents, subtotal} = this.state;
        return (
            <div className="container">
                <h3 align="left">Shopping Cart</h3>
                <table className="table table-hover table-sm table-borderless table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Seller</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {contents.map((content, index) => (
                        <tr key={index}>
                            <td>{content.item_id}</td>
                            <td>{content.item_name}</td>
                            <td>{content.seller}</td>
                            <td>${(content.price / 100).toFixed(2)}</td>
                            <td>{content.quantity}</td>
                            <td><button type="button" className="btn btn-danger">X</button></td>
                        </tr>
                    ))}
                </tbody>
                </table>
                <h5 align="right">Subtotal: ${(subtotal / 100).toFixed(2)}</h5>
                <div align="right">
                    <button type="button" className="btn btn-success">Checkout</button>
                </div>
            </div>
        );
    }
}

export default CartPage;