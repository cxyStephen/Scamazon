import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const API = 'http://85c320be.ngrok.io/';
const GET_CATEGORIES_ENDPOINT = 'get_categories';
const CREATE_ITEM_ENDPOINT = 'create_item';

class ItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            desc: '',
            manufacturer: '',
            category: '',
            categories: [],
            isLoading: false,
            error: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
    
        fetch(API + GET_CATEGORIES_ENDPOINT)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong...')
            }
        })
        .then(data => this.setState({categories: data.categories, isLoading: false}))
        .catch(error => this.setState({error, isLoading: false}));
      }

    handleInputChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = JSON.stringify({
            name: this.state.name,
            desc: this.state.desc,
            manufacturer: this.state.manufacturer,
            category: this.state.category
        });
        fetch(API + CREATE_ITEM_ENDPOINT, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: data
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.success + "\n" + data.message);
            if (data.success) {
                alert('A new item was created.');
            } else {
                alert('Error: Could not create a new item.');;
            }
        })
        .catch(error => console.error(error));;
    }

    render() {
        const {categories, isLoading, error} = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div className="container">
                <h3>Create a new item</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>
                            Item Name:
                            <input className="form-control" name="name" type="text" value={this.state.name} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Item Description:
                            <textarea className="form-control" name="desc" value={this.state.description} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Item Manufacturer:
                            <input className="form-control" name="manufacturer" type="text" value={this.state.manufacturer} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Item Category:
                            <select className="form-control" name="category" value={this.state.category} onChange={this.handleInputChange}>
                                {categories.map(category => 
                                    <option value={category}>{category}</option>
                                )}
                            </select>
                        </label>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ItemForm;