import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import UserAuth from "./userAuth";
import UserType from "./userType";
import MarketPlace from "./marketPlace";

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
              <UserAuth {...props} onLogin={this.props.onLogin} />
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
