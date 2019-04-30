import React, { Component } from "react";
import "./App.css";
import Main from "./components/main";
import NavBar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar isLoggedIn={this.state.loggedIn} onLogout={this.handleLogout} />
        <div>Current user is: {this.state.email}</div>
        <Main onLogin={this.handleLogin} />
      </div>
    );
  }

  state = { loggedIn: false, email: "" };
  handleLogin = email => {
    this.setState({ loggedIn: true, email: email });
  };
  handleLogout = () => {
    this.setState({ email: "" });
    this.props.history.push("/");
  };
}

export default App;
