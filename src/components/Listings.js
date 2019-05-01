import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const API = 'http://85c320be.ngrok.io/';
const ENDPOINT = 'get_listings';

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listings: [],
        isLoading: false,
        error: null
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch(API + ENDPOINT)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong...')
        }
    })
    .then(data => this.setState({listings: data.listings, isLoading: false}))
    .catch(error => this.setState({error, isLoading: false}));
  }

  render() {
    const {listings, isLoading, error} = this.state;

    if (error) {
        return <p>{error.message}</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
    <div className="container">
        <h3>Listings</h3>
        <table className="table table-bordered table-hover table-condensed">
            <thead>
                <tr>
                    <th>Item ID</th>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Seller ID</th>
                    <th>Seller Name</th>
                </tr>
            </thead>
            <tbody>
                {listings.map(listing => 
                    <tr> 
                        <td>{listing.item_id}</td>
                        <td>{listing.item_name}</td>
                        <td>{listing.price}</td>
                        <td>{listing.quantity}</td>
                        <td>{listing.seller_id}</td>
                        <td>{listing.seller_name}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
    );
  }
}

export default Listings;