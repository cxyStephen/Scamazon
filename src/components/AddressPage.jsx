import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import API from "../constants";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

class AddressPage extends Component {
  state = {
    addresses: [],
    isLoading: true,
    error: "",
    selectedAddresses: []
  };

  componentDidMount() {
    console.log("cmp mount");
    const url = API + "/get_addresses?";
    const email = this.props.email;
    if (email.length === 0) return;
    const query = "user=" + email;
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
    if (this.props.email.length === 0) return <Redirect to="/user" />;

    let table, deleteButton, error;

    if (this.state.selectedAddresses.length === 0)
      deleteButton = (
        <Button variant="danger" disabled>
          Delete Addresses
        </Button>
      );
    else
      deleteButton = (
        <Button variant="danger" onClick={this.handleDelete}>
          Delete Addresses
        </Button>
      );

    if (this.state.error.length > 0)
      error = <Alert variant="danger">{this.state.error}</Alert>;
    else error = "";

    if (!this.state.isLoading && this.state.addresses.length > 0) {
      table = (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th />
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
                  <td>
                    <Form.Group
                      controlId={data.address_id}
                      onChange={this.handleSelect}
                    >
                      <Form.Check type="checkbox" />
                    </Form.Group>
                  </td>
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
        {error}
        <h1>Addresses</h1>
        <Row>
          <Col>{deleteButton}</Col>
          <Col>
            <NavLink to="address/new">Add an address</NavLink>
          </Col>
        </Row>
        {table}
      </div>
    );
  }

  handleSelect = e => {
    let { selectedAddresses } = this.state;
    if (e.target.checked) selectedAddresses.push(e.target.id);
    else selectedAddresses.splice(selectedAddresses.indexOf(e.target.id));
    this.setState({ selectedAddresses });
  };

  handleDelete = () => {
    const url = API + "/modify_address";
    const email = this.props.email;
    const { selectedAddresses } = this.state;
    let change = false;

    // console.log(
    //   this.state.addresses.filter(
    //     x => !selectedAddresses.includes(x.address_id.toString())
    //   )
    // );

    for (let i = 0; i < selectedAddresses.length; i++) {
      fetch(url, {
        method: "DELETE",
        body: JSON.stringify({ id: selectedAddresses[i], user: email }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(response => {
          console.log(response.success + "\n" + response.message);
          if (response.success) change = true;
          if (!response.success) this.setState({ error: response.message });
          if (change && i === selectedAddresses.length - 1) {
            let newAddresses = this.state.addresses.filter(
              x => !selectedAddresses.includes(x.address_id.toString())
            );
            console.log(newAddresses);
            this.setState({ addresses: newAddresses });
          }
        })
        .catch(error => console.error(error));
    }
  };
}
export default AddressPage;
