import React, { Component } from "react";
import API from "../constants";
import { Link } from "react-router-dom";

class CartPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          contents: [],
          subtotal: "",
        };
      }

    componentDidMount() {
        const path = "/get_cart";
        const query = "?user=" + this.props.email;
        if (query.length === 6) 
            return;
        fetch(API + path + query)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.setState({ 
                    contents: data.contents, 
                    subtotal: data.subtotal 
                });
            }
        })
        .catch(error => console.error(error));
    }

    updateCart = (e, content, targetIndex) => {
        const target = e.target;
        let data;
        if (target.name === "deleteItem") {
            data = JSON.stringify({
                email: this.props.email,
                item: content.item_id,
                seller: content.seller,
                quantity: 0
            });
        } else if (target.name === "updateQuantity") {
            e.preventDefault();
            data = JSON.stringify({
                email: this.props.email,
                item: content.item_id,
                seller: content.seller,
                quantity: parseInt(target.elements["quantity"].value, 10)
            });
        }
        fetch(API + "/modify_cart", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.success + "\n" + data.message);
            if (data.success) {
                if (target.name === "deleteItem") {
                    this.setState(prevState => {
                        const updatedContents = prevState.contents.filter((content, index) => index !== targetIndex)
                        return {
                            contents: updatedContents
                        }
                    });
                } else if (target.name === "updateQuantity") {
                    alert("Item quantity was updated");
                    const path = "/get_cart";
                    const query = "?user=" + this.props.email;
                    if (query.length === 6) 
                        return;
                    fetch(API + path + query)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            this.setState({ 
                                contents: data.contents, 
                                subtotal: data.subtotal 
                            });
                        }
                    })
                    .catch(error => console.error(error));

                    /*
                    this.setState(prevState => {
                        const updatedContents = prevState.contents.map((content, index) => {
                            if (index === targetIndex) {
                                const updatedContent = {
                                    item_id: content.item_id,
                                    item_name: content.item_name,
                                    price: content.price,
                                    quantity: parseInt(target.elements["quantity"].value, 10),
                                    seller: content.seller
                                }
                                return updatedContent;
                            }
                            return content;
                        });
                        return {
                            contents: updatedContents
                        };
                    });
                    */
                }
            }
        })
        .catch(error => console.error(error));
    }

    handleInputChange = (e, targetIndex) => {
        const target = e.target;
        this.setState(prevState => {
            const updatedContents = prevState.contents.map((content, index) => {
                if (index === targetIndex) {
                    const updatedContent = {
                        item_id: content.item_id,
                        item_name: content.item_name,
                        price: content.price,
                        quantity: target.value,
                        seller: content.seller
                    }
                    return updatedContent;
                }
                return content;
            });
            return {
                contents: updatedContents
            };
        });
    }

    handleCartCheckout = () => {
        this.props.history.push("/cart/checkout");
    };

    render() {
        const {contents, subtotal} = this.state;

        return (
            <div className="container">
                <h3 align="left">Shopping Cart</h3>
                <table className="table table-hover table-sm table-borderless">
                <thead className="thead-dark">
                    <tr>
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
                            <td><Link to={"item/"+content.item_id}>{content.item_name}</Link></td>
                            <td>{content.seller}</td>
                            <td>${(content.price / 100).toFixed(2)}</td>
                            <td>
                                <form name="updateQuantity" onSubmit={e => this.updateCart(e, content, index)}>
                                    <input 
                                        name="quantity"
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={this.state.contents[index].quantity}
                                        onChange={e => this.handleInputChange(e, index)}
                                    />
                                    <button
                                        name="updateQuantity"
                                        type="submit"
                                        className="btn btn-primary"
                                        size="sm"
                                    >
                                        Update
                                    </button>
                                </form>
                            </td>
                            <td>
                                <button 
                                    name="deleteItem" 
                                    type="button" 
                                    className="btn btn-danger" 
                                    size="sm"
                                    onClick={e => this.updateCart(e, content, index)}
                                >
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
                <h5 align="right">Subtotal: ${(subtotal / 100).toFixed(2)}</h5>
                <div align="right">
                    <button 
                        name="checkout" 
                        type="button" 
                        className="btn btn-success"
                        onClick={this.handleCartCheckout}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        );
    }
}

export default CartPage;
