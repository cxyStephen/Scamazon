import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const API = 'http://85c320be.ngrok.io/';
const ENDPOINT = 'get_listings';

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listings: [],
    };
  }

  componentDidMount() {
    fetch(API + ENDPOINT)
    .then(response => response.json())
    .then(data => this.setState({listings: data.listings}))
    .catch(error => console.error(error));;
  }

  render() {
    const {listings} = this.state;

    return (
    <div className="container">
        <h3>Listings</h3>
        <h5>(what sellers are currently selling in the marketplace)</h5>
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