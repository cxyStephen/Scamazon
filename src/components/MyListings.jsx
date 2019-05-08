import React, { Component } from "react";
import API from "../constants";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CurrencyInput from "react-currency-masked-input";
import Col from "react-bootstrap/Col"
import Badge from "react-bootstrap/Badge"
import Alert from "react-bootstrap/Alert"

class MyListings extends Component {

    constructor() {
        super();
        this.indexOfUpdatedListing = -1;
        this.state = {
            listings: [],
            success: false,
            message: "",
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
            } 
        })
        .catch(error => console.error(error));
    }

    updateListings = (e, listing, index) => {
        const target = e.target;
        let data;
        if (target.name === "delete") {
            data = JSON.stringify({
                item: listing.item_id,
                seller: this.props.email,
                quantity: 0,
                price: listing.price * 100
            });
        } else if (target.name === "update") {
            e.preventDefault();
            this.indexOfUpdatedListing = index;
            data = JSON.stringify({
                item: listing.item_id,
                seller: this.props.email,
                quantity: listing.quantity,
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
            this.setState({success: data.success});
            this.setState({message: data.message});
            console.log(data.success + "\n" + data.message);
            if (data.success) {
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
                            <th>Price | Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listings.map((listing, index) => {
                            let errorAlert;
                            let updated;
                            if (this.indexOfUpdatedListing === index) {
                                if (this.state.success)
                                    updated = <Badge pill variant="success" size="sm">Updated</Badge>
                                else if (this.state.message.length > 0)
                                    errorAlert = <Alert variant="danger" size="sm">{this.state.message}</Alert>;
                            }
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{listing.item_id}</td>
                                    <td>{listing.item_name}</td>
                                    <td>
                                        <Form name="update" onSubmit={e => this.updateListings(e, listing, index)}>
                                            <Form.Row>
                                                <Col align="right">
                                                    <Form.Label>
                                                        Price ($): 
                                                    </Form.Label>
                                                </Col>
                                                <Col align="left">
                                                    <CurrencyInput
                                                        name="price"
                                                        type="number"
                                                        size="sm"
                                                        value={this.state.listings[index].price}
                                                        onChange={(e, maskedValue) => this.handleInputChange(e, index, maskedValue)}
                                                    />
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col align="right">
                                                    <Form.Label>
                                                        Quantity: 
                                                    </Form.Label>
                                                </Col>
                                                <Col align="left">
                                                    <input
                                                        name="quantity"
                                                        type="number"
                                                        min="0"
                                                        step="1"
                                                        size="sm"
                                                        value={this.state.listings[index].quantity}
                                                        onChange={e => this.handleInputChange(e, index)}
                                                    />
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>  
                                                </Col>
                                                <Col align="left">
                                                    <Button
                                                        type="submit"
                                                        variant="primary"
                                                        size="sm"
                                                    >
                                                        Update
                                                    </Button>
                                                    {updated}
                                                </Col>
                                            </Form.Row>
                                            {errorAlert}
                                        </Form>
                                    </td>
                                    <td>
                                        <Button
                                            name="delete" 
                                            type="button" 
                                            variant="danger"
                                            size="sm"
                                            onClick={e => this.updateListings(e, listing)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default MyListings;
