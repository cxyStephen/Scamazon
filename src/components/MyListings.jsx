import React, { Component } from "react";
import API from "../constants";

class MyListings extends Component {
    constructor() {
        super();
        this.state = {
            listings: []
        }
    }

    componentDidMount() {
        const path = "/get_listings";
        const query = "?user=" + this.props.email;
        if (query.length === 6)
            return;
        fetch(API + path + query)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
            this.setState({
                listings: data.listings.filter(listing => listing.seller_id === this.props.email)
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
                quantity: listing.price,
                price: parseInt(target.elements["price"].value, 10)
            });
        } else if (target.name === "updateQuantity") {
            e.preventDefault();
            data = JSON.stringify({
                item: listing.item_id,
                seller: this.props.email,
                quantity: parseInt(target.elements["quantity"].value, 10),
                price: listing.price
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
                const query = "?user=" + this.props.email;
                if (query.length === 6) 
                    return;
                fetch(API + path + query)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        this.setState({ 
                            listings: data.listings
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
        let updatedListing;
        this.setState(prevState => {
            const updatedListings = prevState.listings.map((listing, index) => {
                if (index === targetIndex) {
                    const priceDisplayed = target.value * 100;
                    if (target.name === "price") {
                        updatedListing = {
                            item_id: listing.item_id,
                            item_name: listing.item_name,
                            price: target.value,
                            quantity: listing.quantity,
                        }
                    } else if (target.name === "quantity") {
                        updatedListing = {
                            item_id: listing.item_id,
                            item_name: listing.item_name,
                            price: listing.price,
                            quantity: target.value,
                        }
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
                <table className="table table-hover table-sm table-borderless table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Listing #</th>
                            <th>Item ID</th>
                            <th>Item Name</th>
                            <th>Price</th>
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
                                    <form name="updatePrice" onSubmit={e => this.updateListings(e, listing)}>
                                        $
                                        <input 
                                            name="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={(this.state.listings[index].price / 100).toFixed(2)}
                                            onChange={e => this.handleInputChange(e, index)}
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            size="sm"
                                        >
                                            Update
                                        </button>
                                    </form>
                                </td>
                                <td>
                                    <form name="updateQuantity" onSubmit={e => this.updateListings(e, listing)}>
                                        <input 
                                            name="quantity"
                                            type="number"
                                            min="0"
                                            step="1"
                                            value={this.state.listings[index].quantity}
                                            onChange={e => this.handleInputChange(e, index)}
                                        />
                                        <button
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
                                        name="deleteListing" 
                                        type="button" 
                                        className="btn btn-danger" 
                                        size="sm"
                                        onClick={e => this.updateListings(e, listing)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MyListings;
