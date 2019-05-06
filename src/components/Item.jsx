import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import StarRatingComponent from "react-star-rating-component";
import API from "../constants";
import Image from "react-bootstrap/Image";
import AddToCart from "./AddToCart";
import ReviewForm from "./ReviewForm";

class Item extends Component {
  constructor(...args) {
    super(...args);
    this.loadReviews = this.loadReviews.bind(this);
    this.state = {
      showModal: false,
      reviews: [],
      listings: [],
      images: [],
      rating: 0,
      item: {
        category: "",
        desc: "",
        item_id: -1,
        manufacturer: "",
        name: ""
      },
      showReviewForm: false
    };
  }

  componentDidMount() {
    let url = API + "/get_item?";
    let query = "item_id=" + this.props.match.params.item_id;
    fetch(url + query)
      .then(response => response.json())
      .then(data => this.setState({ item: data.item, images: data.images }))
      .then(() => {
        this.loadReviews();
        url = API + "/get_listings?";
        query = "type=item&id=" + this.props.match.params.item_id;
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
    const query = "type=item&id=" + this.props.match.params.item_id;
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
    const item = this.state.item;
    const reviews = this.state.reviews;
    const rating = this.state.rating;
    const listings = this.state.listings;
    const images = this.state.images;

    return (
      <div className="container">
        <div class="row">
          <div class="col-md">
            <h2 id="modal-label">{item.name}</h2>
            <StarRatingComponent
              name="item_rating"
              editing={false}
              starCount={5}
              value={rating}
            />
            {images.length > 0 && (
              <div
                className="container-fluid justify-content-center"
                style={{ width: 400 }}
              >
                <Image
                  src={images[0]}
                  className="h-auto d-inline-block rounded"
                  fluid
                />
              </div>
            )}
            <p>{item.desc}</p>
            <b>Manufacturer:</b> {item.manufacturer}
            <br />
            <b>Category:</b> {item.category}
            <p />
            <h4>Sold by:</h4>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Seller</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {listings.map(listing => (
                  <tr key={listing.seller_id}>
                    <td>
                      {listing.seller_name}
                      <br />
                      <StarRatingComponent
                        name="seller_rating"
                        editing={false}
                        starCount={5}
                        value={listing.seller_rating}
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

          <div class="col-md">
            {(this.state.item.item_id != -1 && this.state.showReviewForm) &&
            <div>
              <ReviewForm
                email={this.props.email}
                type="item"
                id={this.state.item.item_id}
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
                    name="item_rating"
                    editing={false}
                    starCount={5}
                    value={review.rating}
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

export default Item;
