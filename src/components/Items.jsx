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

    //sortByItem();
  }

  render() {
    const {items} = this.state;

    return (
      <div className="container">
        <h3>Items</h3>
        <h5>(what sellers can sell in the marketplace)</h5>
        <div className="form-group" align="right">
          <label>Sort By:
            <select
              name="sort_by"
              value={this.state.sort_by}
              onChange={this.handleInputChange}
            >
              <option value="Item" selected="selected">Item</option>
              <option value="Category">Category</option>
            </select>
          </label>
        </div>
        <table className="table table-bordered table-hover table-condensed">
          <thead>
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
              <tr>
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
