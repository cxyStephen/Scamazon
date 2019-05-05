import React, { Component } from "react";
import API from "../constants";
import StarRatingComponent from "react-star-rating-component";
import Item from "./Item";

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
    const sort_by = e.target.value;
    // eslint-disable-next-line default-case
    switch (sort_by) {
      case "item_rating":
        listings.sort(
          (a, b) => parseInt(b.item_rating) - parseInt(a.item_rating)
        );
        break;
      case "seller_rating":
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
      case "priceDes":
        listings.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "priceAsc":
        listings.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }
    this.setState({ sort_by: sort_by, listings: listings });
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
              name="sort_by"
              value={this.state.sort_by}
              onChange={this.handleInputChange}
            >
              <option value="item_rating">Item Rating</option>
              <option value="seller_rating">Seller Rating</option>
              <option value="item">Item</option>
              <option value="seller">Seller</option>
              <option value="priceDes">Descending Price</option>
              <option value="priceAsc">Ascending Price</option>
            </select>
          </label>
        </div>
        <table className="table table-hover table-sm table-borderless table-striped">
          <thead className="thead-dark">
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
              <tr key={listing.item_id + listing.seller_id}>
                <td>{listing.item_id}</td>
                <td>
                  <Item
                    display={listing.item_name}
                    item_id={listing.item_id}
                    email={this.props.email}
                  />
                </td>
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
