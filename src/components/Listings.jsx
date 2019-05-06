import React, { Component } from "react";
import API from "../constants";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StarRatingComponent from "react-star-rating-component";

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      sort_by: "",
      item_filter: "",
      seller_filter: ""
    };
    this.allListings = [];
  }

  componentDidMount() {
    fetch(API + "/get_listings")
      .then(response => response.json())
      .then(data => {
        data.listings.sort(
          (a, b) => parseInt(b.item_rating) - parseInt(a.item_rating)
        );
        this.setState({ listings: data.listings });
        this.allListings = [...data.listings];
      })
      .catch(error => console.error(error));
  }

  handleInputChange = e => {
    const { listings } = this.state;
    const sort_by = e.target.value;
    // eslint-disable-next-line default-case
    this.listingSort(listings, sort_by);
    this.setState({ sort_by: sort_by, listings: listings });
  };

  handleFilterChange = e => {
    const target = e.target;
    if (target.name === "item_filter")
      this.listingFilter(target.value, this.state.seller_filter);
    else
      this.listingFilter(this.state.item_filter, target.value);
    this.setState({ [target.name]: target.value });
  }

  listingSort = (listings, sort_by) => {
    switch (sort_by) {
      case "item_rating":
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
  }

  listingFilter = (item_filter, seller_filter) => {
    item_filter = item_filter.toLowerCase();
    seller_filter = seller_filter.toLowerCase();
    let newListings = this.allListings.filter(
      listing =>
        listing.item_name.toLowerCase().includes(item_filter)
          && listing.seller_name.toLowerCase().includes(seller_filter));
    this.listingSort(newListings, this.state.sort_by);
    this.setState({ listings: newListings });
  }

  render() {
    let { listings } = this.state;

    return (
      <div className="container">
        <h3 align="left">Listings</h3>
        <Form>
          <Row>
            <Col align="left">
              <b>Filter by:</b>
            </Col>
            <Col align="right">
              <b>Sort by:</b>
            </Col>
          </Row>
          <Row>
            <Col xs={5}>
              <Form.Control placeholder="Item name" onChange={this.handleFilterChange} name="item_filter"/>
            </Col>
            <Col xs={5}>
              <Form.Control placeholder="Seller name" onChange={this.handleFilterChange} name="seller_filter"/>
            </Col>
            <Col xs={2}>
              <div className="form-group" align="right">
                <select
                  name="sort_by"
                  value={this.state.sort_by}
                  onChange={this.handleInputChange}
                  className="custom-select"
                >
                  <option value="item_rating">Item Rating</option>
                  <option value="seller_rating">Seller Rating</option>
                  <option value="item">Item Name</option>
                  <option value="seller">Seller Name</option>
                  <option value="highestPrice">Highest Price</option>
                  <option value="lowestPrice">Lowest Price</option>
                </select>
              </div>
            </Col>
          </Row>
        </Form>
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
            {listings.filter(listing => listing.quantity > 0).map(listing => (
              <tr key={listing.item_id + listing.seller_id}>
                <td><Link to={"item/"+listing.item_id}>{listing.item_name}</Link></td>
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
