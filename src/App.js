import React, { Component } from "react";
import "./App.css";
import Main from "./components/main";
import NavBar from "./components/navbar";
import Button from "react-bootstrap/Button";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar isLoggedIn={this.state.loggedIn} onLogout={this.handleLogout} />
        <div>Current user is: {this.state.email}</div>
        <Button variant="primary" onClick={() => this.test()}>
          Test
        </Button>
        <hr />

        <Main onLogin={this.handleLogin} email={this.state.email} />
      </div>
    );
  }

  state = { loggedIn: false, email: "" };

  test() {
    //this.setState({ redirect: true });
    this.props.history.push("/user/type");
  }

  handleLogin = email => {
    this.setState({ loggedIn: true, email: email });
  };
  handleLogout = () => {
    this.setState({ loggedIn: false, email: "" });
    this.props.history.push("/");
  };
}

export default App;
