import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { api } from "../constants";

class userAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pw: "",
      isRegister: false,
      registerText: "I need to create an account",
      header: "Log in",
      loggedIn: false,
      error: ""
    };
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/" />;
    }
    let errorAlert;
    if (this.state.error.length > 0)
      errorAlert = <Alert variant="danger">{this.state.error}</Alert>;

    return (
      <Container>
        {errorAlert}
        <h1 className="mb-3">{this.state.header}</h1>
        <Row className="justify-content-md-center">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="pw">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <div onClick={this.handleSignInText} className="m-2">
              {this.state.registerText}
            </div>
          </Form>
        </Row>
      </Container>
    );
  }

  handleSignInText = () => {
    const isRegister = !this.state.isRegister;
    const registerText = isRegister
      ? "I already have an account"
      : "I need to create an account";
    const header = isRegister ? "Sign up" : "Log in";
    this.setState({ isRegister, registerText, header });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.validateForm()) return;
    const data = JSON.stringify({
      email: this.state.email,
      pw: this.state.pw
    });
    const url = api + (this.state.isRegister ? "/create_user" : "/login");
    console.log(url + data);
    //console.log(this.props);
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
        if (response.success) {
          this.props.onLogin(this.state.email);
          if (!this.state.isRegister) {
            this.setState({ loggedIn: true });
          } else this.props.history.push("/user/type");
        } else {
          this.setState({ error: response.message });
        }
      })
      .catch(error => console.error(error));
  };

  validateForm() {
    let isValid = true;
    if (this.state.email.length === 0) {
      isValid = false;
    }
    if (this.state.pw.length === 0) {
      isValid = false;
    }
    return isValid;
  }
}

export default userAuth;
