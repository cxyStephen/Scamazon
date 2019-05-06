import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Table from "react-bootstrap/Table";

class Order extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  render() {
    const { details } = this.props;

    return (
      <>
        <ListGroupItem onClick={this.handleShow}>
          Order Number: {details.order_id} &emsp;&emsp;{" "}
          {details.purchase_date_string}
        </ListGroupItem>

        <Modal show={this.state.show} onHide={this.handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              Order Number: {details.order_id} &emsp;&emsp;{" "}
              {details.purchase_date_string}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table className="table-borderless table-sm">
              <thead>
                <tr>
                  <th>Shipping Address</th>
                  <th>Payment Method</th>
                  <th>Order Summary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>{details.address.name}</div>
                    <div>{details.address.address}</div>
                    <div>
                      {details.address.city}, {details.address.state}{" "}
                      {details.address.zip}
                    </div>
                    <div>{details.address.country}</div>
                  </td>
                  <td>
                    <div>{details.payment.type}</div>
                    <div>{details.payment.key}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: "bold", color: "#b12704" }}>
                      Total: ${details.total_price / 100}
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table>
              <thead>
                <tr>
                  <th>Shipment Info</th>
                  <th>Shipment Contents</th>
                </tr>
              </thead>
              <tbody>
                {details.shipments.map(shipment => (
                  <tr key={shipment.shipment_id}>
                    <td>
                      <div>Shipment Date: {shipment.ship_date} </div>
                      <div>Tracking Number: {shipment.tracking_num}</div>
                      <div>{shipment.company + " " + shipment.speed}</div>
                    </td>
                    <td>
                      {shipment.items.map(item => (
                        <div key={item.item_id}>
                          <div style={{ fontWeight: "bold" }}>
                            {item.item_name}
                          </div>
                          <div>Quantity: {item.quantity}</div>
                          <div style={{ fontWeight: "bold", color: "#b12704" }}>
                            Price: $
                          </div>
                          <div style={{ color: "#888" }}>
                            Sold by: {item.seller}
                          </div>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
}

export default Order;
