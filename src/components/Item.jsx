import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import StarRatingComponent from 'react-star-rating-component';
import API from "../constants";
import AddToCart from "./AddToCart";

class Item extends Component {
  constructor(...args) {
    super(...args);
    this.state = { showModal: false, reviews: [], listings: [], rating: 0,
      item: {
        category: "",
        desc: "",
        item_id: -1,
        manufacturer: "",
        name: ""
    }};
  }

  componentDidMount() {
    let url = API + "/get_item?";
      let query = "item_id=" + this.props.match.params.item_id;
      fetch(url + query)
      .then(response => response.json())
      .then(data => this.setState({item: data.item}))
      .then(() => {
        url = API + "/get_reviews?";
        query = "type=item&id=" + this.props.match.params.item_id;
        fetch(url + query)
        .then(response => response.json())
        .then(data => this.setState({reviews: data.reviews, rating: data.average_rating}))
        .catch(error => console.error(error));

        url = API + "/get_listings?";
        fetch(url + query)
        .then(response => response.json())
        .then(data => this.setState({listings: data.listings}))
        .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
      
      this.setState({ showModal: true });
  }

  render() {

    const item = this.state.item;
    const reviews = this.state.reviews;
    const rating = this.state.rating;
    const listings = this.state.listings;

    return (
          <table className="table">
          <tbody>
            <tr><td width="650">
            <h3 id="modal-label">{item.name}</h3>
            <StarRatingComponent 
                name="item_rating"
                editing={false}
                starCount={5}
                value={rating}
              />
            <p>{item.desc}</p>
            <b>Manufacturer:</b> {item.manufacturer}
            <br />
            <b>Category:</b> {item.category}
            <p></p>
          <h4>Sold by:</h4>
          <table className="table table-hover table-borderless">
          <thead className="thead-dark">
            <tr width = "600">
              <th>Seller</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listings.map(listing => (
              <tr key={listing.seller_id}>
                <td>{listing.seller_name}<br />
                <StarRatingComponent 
                    name="seller_rating"
                    editing={false}
                    starCount={5}
                    value={listing.seller_rating}
                  /></td>
                <td>${(listing.price / 100).toFixed(2)}</td>
                <td>{listing.quantity}</td>
                <td><AddToCart email={this.props.email} item={listing.item_id} seller={listing.seller_id}/></td>
              </tr>
            ))}
          </tbody>
        </table>
            </td>
            <td width="500">
            <h4>Reviews:</h4>
            <div>
            {reviews.map(review => (
              <div key={review.user}>
              <h5>{review.user_fname} {review.user_lname}</h5>
              <h6>{review.title}</h6>
              <StarRatingComponent 
                name="item_rating"
                editing={false}
                starCount={5}
                value={review.rating}
              />
              <p>{review.desc}</p>
              <hr />
              </div>
            ))}</div>
            </td>
            </tr>
            </tbody>
          </table>
    );
  }
}

export default Item;