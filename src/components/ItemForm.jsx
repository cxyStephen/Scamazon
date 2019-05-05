import React, { Component } from "react";
import API from "../constants";

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image_url: "",
      desc: "",
      manufacturer: "",
      category: "",
      categories: [],
      isLoading: false,
      error: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API + "/get_categories")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .then(data =>
        this.setState({ categories: data.categories, isLoading: false })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleInputChange = e => {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = JSON.stringify({
      name: this.state.name,
      desc: this.state.desc,
      manufacturer: this.state.manufacturer,
      category: this.state.category
    });
    fetch(API + "/create_item", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: data
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.success + "\n" + data.message);
      if (data.success) {
        alert("A new item was created.");
        window.location.reload();
      } else {
        alert("Error: Could not create a new item.");
      }
    })
    .catch(error => console.error(error));
  }

  render() {
    const { categories, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="container">
        <h3>Create a new item</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Item Name:
              <input
                className="form-control"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleInputChange}
                placeholder="Enter a name"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Item Image URL:
              <input
                className="form-control"
                name="image_url"
                type="text"
                value={this.state.image_url}
                onChange={this.handleInputChange}
                placeholder="Enter an image URL"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Item Description:
              <textarea
                className="form-control"
                name="desc"
                value={this.state.description}
                onChange={this.handleInputChange}
                placeholder="Enter a description"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Item Manufacturer:
              <input
                className="form-control"
                name="manufacturer"
                type="text"
                value={this.state.manufacturer}
                onChange={this.handleInputChange}
                placeholder="Enter a manufacturer"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Item Category:
              <select
                className="form-control"
                name="category"
                value={this.state.category}
                onChange={this.handleInputChange}
              >
                {categories.map(category => (
                  <option value={category} key={category}>{category}</option>
                ))}
              </select>
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

export default ItemForm;
