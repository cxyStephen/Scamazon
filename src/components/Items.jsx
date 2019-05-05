import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import API from "../constants";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], 
      sortBy: ""
    };
  }

  componentDidMount() {
    fetch(API + "/get_items")
      .then(response => response.json())
      .then(data => {
        data.items.sort(
          (a, b) => a.name.localeCompare(b.name)
        );
        this.setState({ items: data.items })
      })
      .catch(error => console.error(error));
  }

  handleInputChange = e => {
    const {items} = this.state;
    const sortBy = e.target.value;
    if (sortBy === "item") {
      items.sort(
          (a, b) => a.name.localeCompare(b.name)
      );
    } else if (sortBy === "category") {
      items.sort(
          (a, b) => a.category.localeCompare(b.category)
      );
    }
    this.setState({ sortBy: sortBy, items: items });
  }

  render() {
    let {items} = this.state;

    return (
      <div className="container">
        <h3 align="left">Items</h3>
        <div className="form-group" align="right">
          <label>Sort By:
            <select
              name="sortBy"
              value={this.state.sortBy}
              onChange={this.handleInputChange}
            >
              <option value="item">Item</option>
              <option value="category">Category</option>
            </select>
          </label>
        </div>
        <table className="table table-bordered table-hover table-sm table-borderless table-striped">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Manufacturer</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.item_id}>
                <td>{item.item_id}</td>
                <td>{item.name}</td>
                <td>{item.desc}</td>
                <td>{item.manufacturer}</td>
                <td>{item.category}</td>
                <td>
                  <Link to={"/createlisting/" + item.item_id} name={item.name}>
                    <Button className="btn btn-primary" size="sm">
                      Create Listing
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Items;
