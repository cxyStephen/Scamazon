import React, { Component } from "react";
import API from "../constants";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image_url: "",
      desc: "",
      manufacturer: "",
      category: "",
      categories: [],
      success: false,
      message: ""
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API + "/get_categories")
      .then(response => response.json())
      .then(data =>
        this.setState({ categories: data.categories})
      )
      .catch(error => console.error(error));
  }

  handleInputChange = e => {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = JSON.stringify({
      name: this.state.name,
      desc: this.state.desc,
      manufacturer: this.state.manufacturer,
      category: this.state.category,
      image_url: this.state.image_url
    });
    fetch(API + "/create_item", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: data
    })
    .then(response => response.json())
    .then(data => {
      this.setState({success: data.success});
      this.setState({message: data.message});
      console.log(data.success + "\n" + data.message);
    })
    .catch(error => console.error(error));
  }

  render() {
    const { categories } = this.state;
    let errorAlert;
    let itemCreated;
    if (this.state.success)
      itemCreated = <Badge pill variant="success">Item Created</Badge>
    else if (this.state.message.length > 0)
      errorAlert = <Alert variant="danger" size="sm">{this.state.message}</Alert>;

    return (
      <div className="container">
        <h3>Create a new item</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
              <Form.Label>
                Item Name:
                <Form.Control
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  placeholder="Enter a name"
                  required
                />
              </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Item Image URL:
              <Form.Control
                name="image_url"
                value={this.state.image_url}
                onChange={this.handleInputChange}
                placeholder="Enter an image URL"
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Item Description:
              <Form.Control
                as="textarea"
                name="desc"
                value={this.state.description}
                onChange={this.handleInputChange}
                placeholder="Enter a description"
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Item Manufacturer:
              <Form.Control
                name="manufacturer"
                value={this.state.manufacturer}
                onChange={this.handleInputChange}
                placeholder="Enter a manufacturer"
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Item Category:
              <Form.Control 
                as="select"
                name="category"
                value={this.state.category}
                onChange={this.handleInputChange}
              >
                {categories.map(category => (
                  <option value={category} key={category}>{category}</option>
                ))}
              </Form.Control>
            </Form.Label>
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
        {itemCreated}
        {errorAlert}
      </div>
    );
  }
}

export default ItemForm;
