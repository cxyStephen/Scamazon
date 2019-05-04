import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Item from "./Item";
import API from "../constants";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      sort_by: "Item"
    };
  }

  componentDidMount() {
    fetch(API + "/get_items")
      .then(response => response.json())
      .then(data => this.setState({ items: data.items }))
      .catch(error => console.error(error));
  }

  handleInputChange = e => {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    const {items} = this.state;

    return (
      <div className="container">
        <h3>Items</h3>
        <div className="form-group" align="right">
          <label>Sort By:
            <select
              name="sort_by"
              value={this.state.sort_by}
              onChange={this.handleInputChange}
            >
              <option value="Item">Item</option>
              <option value="Category">Category</option>
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
                <td><Item display={item.name} item_id={item.item_id} email={this.props.email}/></td>
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
