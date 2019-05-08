import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import StarRatingComponent from "react-star-rating-component";
import HalfStar from "./star-half.png"
import API from "../constants";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import ReviewForm from "./ReviewForm";

class Store extends Component {
  constructor(...args) {
    super(...args);
    this.loadReviews = this.loadReviews.bind(this);
    this.state = {
      reviews: [],
      listings: [],
      rating: 0,
      store_name: "",
      showReviewForm: false
    };
  }

  componentDidMount() {
    let url = API + "/get_user_names?";
    let query = "email=" + this.props.match.params.user_id;
    fetch(url + query)
      .then(response => response.json())
      .then(data => this.setState({ store_name: data.store_name }))
      .then(() => {
        this.loadReviews();
        url = API + "/get_listings?";
        query = "type=seller&id=" + this.props.match.params.user_id;
        fetch(url + query)
          .then(response => response.json())
          .then(data => this.setState({ listings: data.listings }))
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));

    this.setState({ showModal: true });
  }

  loadReviews() {
    const url = API + "/get_reviews?";
    const query = "type=seller&id=" + this.props.match.params.user_id;
    fetch(url + query)
      .then(response => response.json())
      .then(data =>
        {
          let showRF = true;
          data.reviews.forEach(e=>{
            if (e.user === this.props.email)
              showRF = false;
          });
          this.setState({
            reviews: data.reviews,
            rating: data.average_rating,
            showReviewForm: showRF
          });
        }
      )
      .catch(error => console.error(error));
  }

  render() {
    const reviews = this.state.reviews;
    const rating = this.state.rating;
    const listings = this.state.listings;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md">
            <h2>{this.state.store_name}</h2>
            <h5>({this.props.match.params.user_id})</h5>
            <StarRatingComponent
              name="seller_rating"
              editing={false}
              starCount={5}
              value={rating}
              renderStarIconHalf={() => <span><Image src={HalfStar} /></span>}
            />
            <h4>Currently selling:</h4>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {listings.map(listing => (
                  <tr key={listing.item_id}>
                    <td>
                      <Link to={"/item/"+listing.item_id}>{listing.item_name}</Link>
                      <br />
                      <StarRatingComponent
                        name="item_rating"
                        editing={false}
                        starCount={5}
                        value={listing.item_rating}
                        renderStarIconHalf={() => <span><Image src={HalfStar} /></span>}
                      />
                    </td>
                    <td>${(listing.price / 100).toFixed(2)}</td>
                    <td>{listing.quantity}</td>
                    <td width={120}>
                      <AddToCart
                        email={this.props.email}
                        item={listing.item_id}
                        seller={listing.seller_id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-md">
            {(this.state.store_name.length !== 0 && this.state.showReviewForm) &&
            <div>
              <ReviewForm
                email={this.props.email}
                type="seller"
                id={this.props.match.params.user_id}
                onSubmit={this.loadReviews}
              />
              <hr />
            </div>}
            <h4>Reviews:</h4>
            <div>
              {reviews.map(review => (
                <div key={review.user}>
                  <h5>
                    {review.user_fname} {review.user_lname}
                  </h5>
                  <h6>{review.title}</h6>
                  <StarRatingComponent
                    name="seller_rating"
                    editing={false}
                    starCount={5}
                    value={review.rating}
                    renderStarIconHalf={() => <span><Image src={HalfStar} /></span>}
                  />
                  <p>{review.desc}</p>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Store;
