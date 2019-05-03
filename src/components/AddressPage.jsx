import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import API from "../constants";
import Table from "react-bootstrap/Table";

class AddressPage extends Component {
  state = {
    addresses: "",
    isLoading: true,
    error: ""
  };

  componentDidMount() {
    const url = API + "/get_addresses?";
    const query = "user=" + this.props.email;
    if (query.length === 0) return;
    fetch(url + query)
      .then(res => res.json())
      .then(response => {
        this.setState({ addresses: response.addresses, isLoading: false });
        console.log(
          "get_addresses: \n" + response.success + "\n" + response.message
        );
        if (!response.success) {
          this.setState({ error: response.message });
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    let table;
    if (!this.state.isLoading && this.state.addresses.length > 0) {
      table = (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {this.state.addresses.map(data => {
              return (
                <tr key={data.address_id}>
                  <td>{data.name}</td>
                  <td>{data.address}</td>
                  <td>{data.city}</td>
                  <td>{data.state}</td>
                  <td>{data.zip}</td>
                  <td>{data.country}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    }
    return (
      <div>
        <div>Addresses</div>
        <NavLink to="address/new">Add an address</NavLink>
        {table}
      </div>
    );
  }
}

export default AddressPage;
