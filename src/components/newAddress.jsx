import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { api } from "../constants";
import Alert from "react-bootstrap/Alert";

class NewAddress extends Component {
  state = {
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    error: ""
  };

  render() {
    let errorAlert;
    if (this.state.error.length > 0)
      errorAlert = <Alert variant="danger">{this.state.error}</Alert>;
    return (
      <Container>
        {errorAlert}
        <h1 className="mb-3">Add a new address</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control onChange={this.handleChange} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="zip">
              <Form.Label>Zip</Form.Label>
              <Form.Control onChange={this.handleChange} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control onChange={this.handleChange} />
            </Form.Group>

            <Form.Group as={Col} controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" onChange={this.handleChange}>
                <option>Choose</option>
                <option value="AK">Alaska</option>
                <option value="AL">Alabama</option>
                <option value="AR">Arkansas</option>
                <option value="AZ">Arizona</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DC">District of Columbia</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="IA">Iowa</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="MA">Massachusetts</option>
                <option value="MD">Maryland</option>
                <option value="ME">Maine</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MO">Missouri</option>
                <option value="MS">Mississippi</option>
                <option value="MT">Montana</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="NE">Nebraska</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NV">Nevada</option>
                <option value="NY">New York</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="PR">Puerto Rico</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VA">Virginia</option>
                <option value="VT">Vermont</option>
                <option value="WA">Washington</option>
                <option value="WI">Wisconsin</option>
                <option value="WV">West Virginia</option>
                <option value="WY">Wyoming</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.isValidForm()) return;
    const data = JSON.stringify({
      name: this.state.name,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      country: "United States",
      zip: this.state.zip,
      user: this.props.email
    });
    const url = api + "/create_address";
    console.log(data);
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response.success + "\n" + response.message);
        if (response.success) this.props.history.push("/user/account/address");
        else if (!response.success && this._isMounted) {
          this.setState({ error: response.message });
        }
      })
      .catch(error => console.error(error));
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  isValidForm() {
    let isValid = true;
    Object.keys(this.state)
      .filter(k => k !== "error")
      .forEach(e => {
        if (this.state[e] === "") {
          isValid = false;
        }
      });
    return isValid;
  }
}

export default NewAddress;
