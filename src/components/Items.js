import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

const API = "http://85c320be.ngrok.io/";
const ENDPOINT = "get_items";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch(API + ENDPOINT)
      .then(response => response.json())
      .then(data => this.setState({ items: data.items }))
      .catch(error => console.error(error));
  }

  render() {
    const { items } = this.state;

    return (
      <div className="container">
        <h3>Items</h3>
        <h5>(what sellers can sell in the marketplace)</h5>
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
