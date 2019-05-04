import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main";
import NavBar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar
          isLoggedIn={this.state.email.length > 0}
          onLogout={this.handleLogout}
        />
        <Main onLogin={this.handleLogin} email={this.state.email} />
      </div>
    );
  }

  componentWillMount() {
    const lsEmail = localStorage.getItem("email");
    if (lsEmail) this.setState({ email: lsEmail });
  }

  state = { email: "" };

  handleLogin = email => {
    this.setState({ email: email });
    localStorage.setItem("email", email);
    this.props.history.push("/");
  };
  handleLogout = () => {
    this.setState({ email: "" });
    localStorage.setItem("email", "");
    this.props.history.push("/");
  };
}

export default App;
