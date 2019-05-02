import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import UserAuth from "./userAuth";
import UserType from "./userType";
import AccountPage from "./accountPage";
import AddressPage from "./addressPage";
import NewAddress from "./newAddress";
import CustomerMarketplace from "./CustomerMarketplace";

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={CustomerMarketplace} />
          <Route
            exact
            path="/user"
            render={props => (
              <UserAuth
                {...props}
                onLogin={this.props.onLogin}
                email={this.props.email}
              />
            )}
          />
          <Route
            exact
            path="/user/account"
            render={props => (
              <AccountPage {...props} email={this.props.email} />
            )}
          />
          <Route
            exact
            path="user/account/type"
            render={props => <UserType {...props} email={this.props.email} />} // this is how u pass props using Route
          />
          <Route
            exact
            path="/user/account/address"
            render={props => (
              <AddressPage {...props} email={this.props.email} />
            )}
          />
          <Route
            exact
            path="/user/account/address/new"
            render={props => <NewAddress {...props} email={this.props.email} />}
          />
        </Switch>
      </main>
    );
  }
}

export default Main;
