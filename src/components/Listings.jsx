import React, { Component } from "react";
import API from "../constants";
import { NavLink } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      sortBy: ""
    };
  }

  componentDidMount() {
    fetch(API + "/get_listings")
      .then(response => response.json())
      .then(data => {
        data.listings.sort(
          (a, b) => parseInt(b.item_rating) - parseInt(a.item_rating)
        );
        this.setState({ listings: data.listings });
      })
      .catch(error => console.error(error));
  }

  handleInputChange = e => {
    const { listings } = this.state;
    const sortBy = e.target.value;
    // eslint-disable-next-line default-case
    switch (sortBy) {
      case "itemRating":
        listings.sort(
          (a, b) => parseInt(b.item_rating) - parseInt(a.item_rating)
        );
        break;
      case "sellerRating":
        listings.sort(
          (a, b) => parseInt(b.seller_rating) - parseInt(a.seller_rating)
        );
        break;
      case "item":
        listings.sort((a, b) => a.item_name.localeCompare(b.item_name));
        break;
      case "seller":
        listings.sort((a, b) => a.seller_name.localeCompare(b.seller_name));
        break;
      case "highestPrice":
        listings.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "lowestPrice":
        listings.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }
    this.setState({ sortBy: sortBy, listings: listings });
  };

  render() {
    let { listings } = this.state;

    return (
      <div className="container">
        <h3 align="left">Listings</h3>
        <div className="form-group" align="right">
          <label>
            Sort By:
            <select
              name="sortBy"
              value={this.state.sortBy}
              onChange={this.handleInputChange}
            >
              <option value="itemRating">Item Rating</option>
              <option value="sellerRating">Seller Rating</option>
              <option value="item">Item</option>
              <option value="seller">Seller</option>
              <option value="highestPrice">Highest Price</option>
              <option value="lowestPrice">Lowest Price</option>
            </select>
          </label>
        </div>
        <table className="table table-hover table-sm table-borderless table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Seller Name</th>
              <th>Item Rating</th>
              <th>Seller Rating</th>
            </tr>
          </thead>
          <tbody>
            {listings.map(listing => (
              <tr key={listing.item_id + listing.seller_id}>
                <td><NavLink to={"item/"+listing.item_id}>{listing.item_name}</NavLink></td>
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
