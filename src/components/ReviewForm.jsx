import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import StarRatingComponent from "react-star-rating-component";
import API from "../constants";

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: undefined,
      rating: 3,
      desc: undefined,
      name: ""
    };
  }

  componentDidMount() {
    const url = API + "/get_user_names?";
    const query = "email=" + this.props.email;
    fetch(url + query)
        .then(response => response.json())
        .then(data =>{
            let name = "";
            if (data.first_name == null)
                name = data.store_name;
            else
                name = data.first_name + " " + data.last_name;
            console.log(name);
            this.setState({
                name: name
            });
        })
        .catch(error => console.error(error));
  }

  handleInputChange = e => {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleStarInput = (nextValue, prevValue, name) => {
    this.setState({
        [name]: nextValue
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = JSON.stringify({
        user: this.props.email,
        title: this.state.title,
        rating: this.state.rating,
        desc: this.state.desc,
        type: this.props.type,
        id: this.props.id
    });
    fetch(API + "/create_review", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: data
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.success + "\n" + data.message);
      if (data.success) {
        alert("A new review was created.");
        this.props.onSubmit();
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="container">
        <h4>Leave a Review</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Your Name:
              <input
                className="form-control"
                name="user"
                type="text"
                value={this.state.name}
                onChange={this.handleInputChange}
                readOnly="readOnly"
              />
            </label>
          </div>
          <div>
            <label>
              Rating:<br/>
              <StarRatingComponent
                name="rating"
                onStarClick={this.handleStarInput.bind(this)}
                starCount={5}
                value={this.state.rating}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Title:
              <input
                className="form-control"
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.handleInputChange}
                placeholder="Enter a title"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Review:
              <textarea
                className="form-control"
                name="desc"
                type="text"
                value={this.state.desc}
                onChange={this.handleInputChange}
                placeholder="Enter a review"
              />
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ReviewForm;
