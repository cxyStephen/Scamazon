import React, { Component } from "react";
import API from "../constants";

class MyPurchases extends Component {
    constructor() {
        super();
        this.state = {
            purchases: []
        }
    }

    componentDidMount() {
        const path = "/get_purchases";
        const query = "?user=" + this.props.email;
        if (query.length === 6)
            return;
        fetch(API + path + query)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
            this.setState({
                purchases: data.purchases
            });
            } else {
                this.setState({ error: data.message });
            }
        })
        .catch(error => console.error(error));
    }

    render() {
        const { purchases } = this.state;
        return (
            <div>
                <h1>Your Purchases</h1>
                <table>
                </table>
            </div>
        );
    }
}

export default MyPurchases;
