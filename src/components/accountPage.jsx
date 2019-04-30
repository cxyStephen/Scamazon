import React, { Component } from "react";

class AccountPage extends Component {
  render() {
    return <div>You are currently logged in as '{this.props.email}'</div>;
  }
}

export default AccountPage;
