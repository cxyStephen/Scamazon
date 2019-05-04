import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import UserAuth from "./UserAuth";
import UserType from "./UserType";
import AccountPage from "./AccountPage";
import AddressPage from "./AddressPage";
import NewAddress from "./NewAddress";
import MarketplacePage from "./MarketplacePage";
import CartPage from "./CartPage";
import SellPage from "./SellPage"
import PaymentPage from "./PaymentPage"
import NewPayment from "./NewPayment"

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" render={props => (
              <MarketplacePage {...props} email={this.props.email} />
            )} />
          <Route exact path="/sell" render={props => (
              <SellPage {...props} email={this.props.email} />
            )} />
          <Route exact path="/cart" render={props => (
              <CartPage {...props} email={this.props.email} />
            )} />
          <Route
            exact path="/user"
            render={props => (
              <UserAuth
                {...props}
                onLogin={this.props.onLogin}
                email={this.props.email}
              />
            )}
          />
          <Route
            exact path="/user/account"
            render={props => (
              <AccountPage {...props} email={this.props.email} />
            )}
          />
          <Route
            exact path="/user/account/type"
            render={props => <UserType {...props} email={this.props.email} />} // this is how u pass props using Route
          />
          <Route
            exact path="/user/account/address"
            render={props => (
              <AddressPage {...props} email={this.props.email} />
            )}
          />
          <Route
            exact path="/user/account/address/new"
            render={props => <NewAddress {...props} email={this.props.email} />}
          />
            <Route
                exact path="/user/account/payment"
                render={props => <PaymentPage {...props} email={this.props.email} />}
            />
            <Route
                exact path="/user/account/payment/new"
                render={props => <NewPayment {...props} email={this.props.email} />}
            />
        </Switch>
      </main>
    );
  }
}

export default Main;
