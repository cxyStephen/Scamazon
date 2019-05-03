import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import FormLabel from "react-bootstrap/FormLabel";
import Alert from "react-bootstrap/Alert";
import API from "../constants";

class UserType extends Component {
    state = {
        createCustomer: false,
        createSeller: false,
        fname: "",
        lname: "",
        name: "",
        error: ""
    };

    render() {
        let customerForm, sellerForm;
        if (this.state.createCustomer)
            customerForm = (
                <div>
                    <Row>
                        <Form.Group as={Col} controlId="fname">
                            <FormLabel>First Name</FormLabel>
                            <Form.Control
                                type="text"
                                placeholder="First name"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="lname">
                            <FormLabel>Last Name</FormLabel>
                            <Form.Control
                                type="text"
                                placeholder="Last name"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Button className="m-2" onClick={() => this.createUserType()}>
                        Create customer
                    </Button>
                </div>
            );
        else if (this.state.createSeller)
            sellerForm = (
                <div>
                    <Row>
                        <Form.Group as={Col} controlId="name">
                            <Form.Control
                                type="text"
                                placeholder="Display name"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Button className="m-2" onClick={() => this.createUserType()}>
                        Create seller
                    </Button>
                </div>
            );
        let errorAlert;

        if (this.state.error.length > 0)
            errorAlert = <Alert variant="danger">{this.state.error}</Alert>;

        return (
            <Form>
                {errorAlert}
                <div className="text-md-left m-3">
                    <Form.Group>
                        <Form.Label as="legend" column sm={2}>
                            Register as a:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                type="radio"
                                label="Customer"
                                name="formHorizontalRadios"
                                id="customerRadio"
                                onChange={this.onClickCustomer}
                            />
                            <Form.Check
                                type="radio"
                                label="Seller"
                                name="formHorizontalRadios"
                                id="sellerRadio"
                                onChange={this.onClickSeller}
                            />
                        </Col>
                    </Form.Group>
                </div>
                <Container>
                    {customerForm}
                    {sellerForm}
                </Container>
            </Form>
        );
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.id]: e.target.value});
    };

    onClickCustomer = e => {
        this.setState({
            createCustomer: e.target.checked,
            createSeller: !e.target.checked
        });
    };
    onClickSeller = e => {
        this.setState({
            createSeller: e.target.checked,
            createCustomer: !e.target.checked
        });
    };
    createUserType = () => {
        if (!this.validateForm())
            return;
        let url;
        let data;
        if (this.state.createCustomer) {
            url = API + "/create_customer";
            data = JSON.stringify({
                email: this.props.email,
                fname: this.state.fname,
                lname: this.state.lname
            });
        } else if (this.state.createSeller) {
            url = API + "/create_seller";
            data = JSON.stringify({
                email: this.props.email,
                name: this.state.name
            });
        } else {
            this.setState({error: "Something went wrong!"});
            return;
        }
        fetch(url, {
            method: "POST",
            body: data,
            headers: {"Content-Type": "application/json"}
        })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    this.props.history.push("/");
                    console.log(response);
                } else {
                    this.setState({error: response.message});
                }
            })
            .catch(error => console.error(error));
    };

    validateForm() {
        if (this.state.createCustomer && (this.state.fname.length === 0 || this.state.lname.length === 0)) {
            this.setState({error: "Please enter a first and last name"})
            return false;
        } else if (this.state.createSeller && this.state.name.length === 0) {
            this.setState({error: "Please enter a display name"})
            return false
        }
        return true;
    }
}

export default UserType;
