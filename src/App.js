import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main";
import NavBar from "./components/Navbar";
import API from "./constants";

class App extends Component {
  state = {
    email: "",
    isCustomer: false,
    isSeller: false
  };

  render() {
    return (
      <div className="App">
        <NavBar
          isLoggedIn={this.state.email.length > 0}
          onLogout={this.handleLogout}
          isCustomer={this.state.isCustomer}
          isSeller={this.state.isSeller}
        />
        <Main
          onLogin={this.handleLogin}
          onNewUserType={this.handleNewUserType}
          email={this.state.email}
          isCustomer={this.state.isCustomer}
          isSeller={this.state.isSeller}
        />
      </div>
    );
  }

  componentWillMount() {
    const lsEmail = localStorage.getItem("email");
    if (lsEmail) this.setState({ email: lsEmail });
  }

  componentDidMount() {
    if (this.state.email.length === 0) return;
    let url = API + "/get_user_type?email=" + this.state.email;
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(response => {
        if (response.success)
          this.setState({
            isCustomer: response.customer,
            isSeller: response.seller
          });
      })
      .catch(error => console.error(error));
  }

  handleNewUserType = typeCreated => {
    if (typeCreated === "customer") this.setState({ isCustomer: true });
    else if (typeCreated === "seller") this.setState({ isSeller: true });
  };

  handleLogin = email => {
    this.setState({ email: email });
    this.componentDidMount();
    localStorage.setItem("email", email);
    this.props.history.push("/");
  };
  handleLogout = () => {
    this.setState({ email: "", isCustomer: false, isSeller: false });
    localStorage.setItem("email", "");
    this.props.history.push("/");
  };
}

export default App;
