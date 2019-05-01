import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const API = 'http://85c320be.ngrok.io/';
const ENDPOINT = 'get_items'

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        isLoading: false,
        error: null
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch(API + ENDPOINT)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong...')
        }
    })
    .then(data => this.setState({items: data.items, isLoading: false}))
    .catch(error => this.setState({error, isLoading: false}));
  }

  render() {
    const {items, isLoading, error} = this.state;

    if (error) {
        return <p>{error.message}</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            <h3>Items</h3>
            <table className="table table-bordered table-hover table-condensed">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Manufacturer</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => 
                        <tr> 
                            <td>{item.item_id}</td>
                            <td>{item.name}</td>
                            <td>{item.desc}</td>
                            <td>{item.manufacturer}</td>
                            <td>{item.category}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
  }
}

export default Items;
