import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

class UserType extends Component {
  render() {
    return (
      <Form>
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
              />
              <Form.Check
                type="radio"
                label="Seller"
                name="formHorizontalRadios"
                id="sellerRadio"
              />
            </Col>
          </Form.Group>
        </div>
      </Form>
    );
  }
}

export default UserType;
