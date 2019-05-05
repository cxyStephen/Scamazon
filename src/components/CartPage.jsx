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
            else {
                this.setState({ error: data.message });
            }
        })
        .catch(error => console.error(error));
    }

    handleInputChange = (e, content, targetIndex) => {
        if (e.target.name === "delete") {
            const data = JSON.stringify({
                email: this.props.email,
                item: content.item_id,
                seller: content.seller,
                quantity: 0
            });

            fetch(API + "/modify_cart", {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: data
              })
              .then(response => response.json())
              .then(data => {
                console.log(data.success + "\n" + data.message);
                if (data.success) {
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
                        else {
                            this.setState({ error: data.message });
                        }
                    })
                    .catch(error => console.error(error));
                } else {
                    this.setState({ error: data.message });
                }
              })
              .catch(error => console.error(error));
        } else if (e.target.name === "updateQuantity") { 
            console.log(e.target.value);
            this.setState(prevState => {
                const updatedContents = prevState.contents.map((content, index) => {
                    if (index === targetIndex) {
                        content.quantity = e.target.value;
                    }
                    return content;
                })
                return {
                    contents: updatedContents
                }
            });
        }
    }

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
                    {contents.map((content,index) => (
                        <tr key={content}>
                            <td>{content.item_name}</td>
                            <td>{content.seller}</td>
                            <td>${(content.price / 100).toFixed(2)}</td>
                            <td>
                                <input 
                                    name="updateQuantity"
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={this.state.contents[index].quantity}
                                    onChange={e => this.handleInputChange(e, content, index)}
                                    placeholder={content.quantity}
                                />
                            </td>
                            <td>
                                <button 
                                    name="delete" 
                                    type="button" 
                                    className="btn btn-danger" 
                                    onClick={e => this.handleInputChange(e, content)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
                <h5 align="right">Subtotal: ${(subtotal / 100).toFixed(2)}</h5>
                <div align="right">
                    <button name="checkout" type="button" className="btn btn-success">Checkout</button>
                </div>
            </div>
        );
    }
}

export default CartPage;