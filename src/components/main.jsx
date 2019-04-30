import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import UserAuth from "./userAuth";
import UserType from "./userType";
import MarketPlace from "./marketPlace";
import AccountPage from "./accountPage";

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={MarketPlace} />
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
            path="/user/type"
            render={props => <UserType {...props} email={this.props.email} />} // this is how u pass props using Route
          />
        </Switch>
      </main>
    );
  }
}

export default Main;
