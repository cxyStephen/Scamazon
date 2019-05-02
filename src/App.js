import React, { Component } from 'react';
//import SellerMarketplace from './components/SellerMarketplace';
import CustomerMarketplace from './components/CustomerMarketplace';
import Listings from './components/Listings';
import ListingForm from './components/ListingForm';
import Items from './components/Items';
import ItemForm from './components/ItemForm';
import React, { Component } from "react";
import "./App.css";
import Main from "./components/main";
import NavBar from "./components/navbar";
import Button from "react-bootstrap/Button";

class App extends Component {
  render() {
    return (
        <div className="App">
          <NavBar
              isLoggedIn={this.state.email.length > 0}
              onLogout={this.handleLogout}
          />
          <div>Current user is: {this.state.email}</div>
          <Button variant="primary" onClick={() => this.test()}>
            Test
          </Button>
          <hr />

          <Main onLogin={this.handleLogin} email={this.state.email} />
          <Listings />
          <ListingForm />
          <Items />
          <ItemForm />
        </div>
    );
  }

  componentWillMount() {
    const lsEmail = localStorage.getItem("email");
    if (lsEmail) this.setState({ email: lsEmail });
  }

  state = { email: "" };

  test() {
    //this.setState({ redirect: true });
    this.props.history.push("/user/account/type");
  }

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
