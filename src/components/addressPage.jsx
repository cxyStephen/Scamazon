import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { api } from "../constants";

class AddressPage extends Component {
  state = {
    addresses: "",
    isLoading: true,
    error: ""
  };

  componentDidMount() {
    const url = api + "/get_addresses?";
    const query = this.props.email;
    if (query.length === 0) return;
    fetch(url + query)
      .then(res => res.json())
      .then(response => {
        this.setState({ addresses: response });
        console.log(this.state.addresses);
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
    return (
      <div>
        <div>Addresses</div>
        <NavLink to="address/new">Add an address</NavLink>
      </div>
    );
  }
}

export default AddressPage;
