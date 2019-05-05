import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import API from "../constants";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], 
      sort_by: ""
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
    const sort_by = e.target.value;
    if (sort_by === "item") {
      items.sort(
          (a, b) => a.name.localeCompare(b.name)
      );
    } else if (sort_by === "category") {
      items.sort(
          (a, b) => a.category.localeCompare(b.category)
      );
    }
    console.log(parseInt(items[0].item_rating));
    this.setState({ sort_by: sort_by, items: items });
  }

  render() {
    let {items} = this.state;

    return (
      <div className="container">
        <h3 align="left">Items</h3>
        <div className="form-group" align="right">
          <label>Sort By:
            <select
              name="sort_by"
              value={this.state.sort_by}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Items;
