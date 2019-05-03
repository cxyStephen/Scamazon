import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import API from "../constants";
import StarRatingComponent from 'react-star-rating-component';

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      sort_by: ""
    };
  }

  componentDidMount() {
    fetch(API + "/get_listings")
      .then(response => response.json())
      .then(data => this.setState({ listings: data.listings }))
      .catch(error => console.error(error));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.sort_by != nextState.sort_by;
  }

  componentWillUpdate() {
    const {listings, sort_by} = this.state;
    switch (sort_by) {
      case "item_rating":
        listings.sort((a, b) => parseInt(b.item_rating) - parseInt(a.item_rating));
        this.setState({listings: listings});
        break;
      case "seller_rating":
        listings.sort((a, b) => parseInt(b.seller_rating) - parseInt(a.seller_rating));
        this.setState({listings: listings});
        break;
      case "item":
        listings.sort((a, b) => parseInt(a.item_id) - parseInt(b.item_id));
        this.setState({listings: listings});
        break;
      case "seller":
        listings.sort((a, b) => (a.seller_name).localeCompare(b.seller_name));
        this.setState({listings: listings});
    }
  }
  
  handleInputChange = e => {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    const {listings} = this.state;
    return (
      <div className="container">
        <h3>Listings</h3>
        <h5>(what sellers are currently selling in the marketplace)</h5>
        <div className="form-group" align="right">
          <label>Sort By:
            <select
              name="sort_by"
              value={this.state.sort_by}
              onChange={this.handleInputChange}
            >
              <option value="item_rating">Item Rating</option>
              <option value="seller_rating">Seller Rating</option>
              <option value="item">Item</option>
              <option value="seller">Seller</option>
            </select>
          </label>
        </div>
        <table className="table table-bordered table-hover table-condensed">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Seller Name</th>
              <th>Item Rating</th>
              <th>Seller Rating</th>
            </tr>
          </thead>
          <tbody>
            {listings.map(listing => (
              <tr>
                <td>{listing.item_id}</td>
                <td>{listing.item_name}</td>
                <td>${(listing.price / 100).toFixed(2)}</td>
                <td>{listing.quantity}</td>
                <td>{listing.seller_name}</td>
                <td>
                  <StarRatingComponent 
                    name="item_rating"
                    editing={false}
                    starCount={5}
                    value={listing.item_rating}
                  />
                </td>
                <td>
                  <StarRatingComponent 
                    name="seller_rating"
                    editing={false}
                    starCount={5}
                    value={listing.seller_rating}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Listings;
