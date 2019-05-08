import React, { Component } from "react";
import API from "../constants";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";

class CartPage extends Component {

    constructor(props) {
        super(props);
        this.indexOfUpdatedContent = -1;
        this.state = {
          contents: [],
          subtotal: "",
          success: false,
          message: ""
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

    updateCart = (e, content, index) => {
        const target = e.target;
        let data;
        if (target.name === "delete") {
            data = JSON.stringify({
                email: this.props.email,
                item: content.item_id,
                seller: content.seller,
                quantity: 0
            });
        } else if (target.name === "update") {
            e.preventDefault();
            this.indexOfUpdatedContent = index;
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
            this.setState({success: data.success});
            this.setState({message: data.message});
            console.log(data.success + "\n" + data.message);
            if (data.success) {
                /*
                if (target.name === "updateQuantity") {
                    alert("Item quantity was updated");
                }
                */
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
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        
        return (
            <div className="container">
                <h1>Shopping Cart</h1>
                <Table hover borderless table-striped size="sm">
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
                    {contents.map((content, index) => {
                        let errorAlert;
                        let updated;
                        if (this.indexOfUpdatedContent === index) {
                            if (this.state.success)
                                updated = <Badge pill variant="success" size="sm">Updated</Badge>
                            else if (this.state.message.length > 0)
                                errorAlert = <Alert variant="danger" size="sm">{this.state.message}</Alert>;
                        }
                        return (
                            <tr key={index}>
                                <td><Link to={"item/"+content.item_id}>{content.item_name}</Link></td>
                                <td>{content.seller}</td>
                                <td>{formatter.format(content.price / 100)}</td>
                                <td>
                                    <Form name="update" onSubmit={e => this.updateCart(e, content, index)}>
                                        <Form.Row>
                                            <Col>
                                                <Form.Control
                                                    name="quantity"
                                                    type="number"
                                                    min="0"
                                                    step="1"
                                                    value={this.state.contents[index].quantity}
                                                    onChange={e => this.handleInputChange(e, index)}
                                                    size="sm"
                                                />
                                            </Col>
                                            <Col align="left">
                                                <Button
                                                    type="submit"
                                                    variant="primary"
                                                    size="sm"
                                                >
                                                    Update
                                                </Button>
                                            </Col>
                                        </Form.Row>
                                        <Form.Row align="left">
                                            <Col>
                                                {updated}
                                                {errorAlert}
                                            </Col>
                                        </Form.Row>
                                    </Form>
                                </td>
                                <td>
                                    <Button 
                                        name="delete" 
                                        type="button" 
                                        variant="danger" 
                                        size="sm"
                                        onClick={e => this.updateCart(e, content, index)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                </Table>
                <h5 align="right">Subtotal: ${(subtotal / 100).toFixed(2)}</h5>
                <div align="right">
                    <Button 
                        name="checkout" 
                        type="button" 
                        variant="success"
                        onClick={this.handleCartCheckout}
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        );
    }
}

export default CartPage;
