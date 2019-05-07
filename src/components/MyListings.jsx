import React, { Component } from "react";
import API from "../constants";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import CurrencyInput from "react-currency-masked-input";

class MyListings extends Component {
    constructor() {
        super();
        this.state = {
            listings: []
        }
    }

    componentDidMount() {
        const path = "/get_listings";
        const query = "?type=seller&id=" + this.props.email;
        if (query.length === "?type=seller&id=".length)
            return;
        fetch(API + path + query)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.setState({
                    listings: data.listings.map(listing => {
                        listing.price = (listing.price / 100).toFixed(2);
                        return listing;
                    })
                });
            } else {
                this.setState({ error: data.message });
            }
        })
        .catch(error => console.error(error));
    }

    updateListings = (e, listing) => {
        const target = e.target;
        let data;
        if (target.name === "deleteListing") {
            data = JSON.stringify({
                item: listing.item_id,
                seller: this.props.email,
                quantity: 0,
                price: listing.price
            });
        } else if (target.name === "updatePrice") {
            e.preventDefault();
            data = JSON.stringify({
                item: listing.item_id,
                seller: this.props.email,
                quantity: listing.quantity,
                price: parseInt(target.elements["price"].value * 100, 10)
            });
        } else if (target.name === "updateQuantity") {
            e.preventDefault();
            data = JSON.stringify({
                item: listing.item_id,
                seller: this.props.email,
                quantity: parseInt(target.elements["quantity"].value, 10),
                price: listing.price * 100
            });
        }
        fetch(API + "/modify_listing", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.success + "\n" + data.message);
            if (data.success) {
                if (target.name === "updatePrice") {
                    alert("Listing price was updated");
                } else if (target.name === "updateQuantity") {
                    alert("Listing quantity was updated");
                }
                const path = "/get_listings";
                const query = "?type=seller&id=" + this.props.email;
                if (query.length === "?type=seller&id=".length)
                    return;
                fetch(API + path + query)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        this.setState({
                            listings: data.listings.map(listing => {
                                listing.price = (listing.price / 100).toFixed(2);
                                return listing;
                            })
                        });
                    } else {
                        this.setState({ error: data.message });
                    }
                })
                .catch(error => console.error(error));
            }
        })
        .catch(error => console.error(error));
    }

    handleInputChange = (e, targetIndex, maskedValue) => {
        const target = e.target;
        let updatedListing;
        this.setState(prevState => {
            const updatedListings = prevState.listings.map((listing, index) => {
                if (index === targetIndex) {
                    if (target.name === "price") {
                        updatedListing = {
                            item_id: listing.item_id,
                            item_name: listing.item_name,
                            price: maskedValue,
                            quantity: listing.quantity,
                        };
                    } else if (target.name === "quantity") {
                        updatedListing = {
                            item_id: listing.item_id,
                            item_name: listing.item_name,
                            price: listing.price,
                            quantity: target.value,
                        };
                    }
                    return updatedListing;
                }
                return listing;
            });
            return {
                listings: updatedListings
            };
        });
    }

    render() {
        const { listings } = this.state;

        return (
            <div className="container">
                <h1>Your Listings</h1>
                <Table hover borderless striped size="sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>Listing #</th>
                            <th>Item ID</th>
                            <th>Item Name</th>
                            <th>Price ($)</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listings.map((listing, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{listing.item_id}</td>
                                <td>{listing.item_name}</td>
                                <td>
                                        <Form name="updatePrice" onSubmit={e => this.updateListings(e, listing)}>
                                            <Form.Row align="center">
                                                <Col>
                                                    <CurrencyInput
                                                        name="price"
                                                        type="number"
                                                        size="sm"
                                                        value={this.state.listings[index].price}
                                                        onChange={(e, maskedValue) => this.handleInputChange(e, index, maskedValue)}
                                                    />
                                                </Col>
                                                <Col align="left">
                                                    <Button
                                                        type="submit"
                                                        variant="primary"
                                                        size="sm"
                                                    >
                                                        Update Price
                                                    </Button>
                                                </Col>
                                            </Form.Row>
                                        </Form>
                                </td>
                                <td>
                                    <Form name="updateQuantity" onSubmit={e => this.updateListings(e, listing)}>
                                        <Form.Row>
                                            <Col>
                                                <Form.Control
                                                    name="quantity"
                                                    type="number"
                                                    min="0"
                                                    step="1"
                                                    size="sm"
                                                    value={this.state.listings[index].quantity}
                                                    onChange={e => this.handleInputChange(e, index)}
                                                />
                                            </Col>
                                            <Col align="left">
                                                <Button
                                                    type="submit"
                                                    variant="primary"
                                                    size="sm"
                                                >
                                                    Update Quantity
                                                </Button>
                                            </Col>
                                        </Form.Row>
                                    </Form>
                                </td>
                                <td>
                                    <Button
                                        name="deleteListing" 
                                        type="button" 
                                        variant="danger"
                                        size="sm"
                                        onClick={e => this.updateListings(e, listing)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default MyListings;
