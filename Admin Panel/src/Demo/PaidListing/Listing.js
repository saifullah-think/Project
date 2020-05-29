import React, { Component } from 'react'
import { Row, Col, Card, Table, Tabs, Tab, InputGroup, FormControl, Modal, Form, Button } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import { connect } from 'react-redux'
import DEMO from "../../store/constant";




class Listing extends Component {

    state = {
        ViewModal: false,
        ListingData: [],
        Status: 'Select Status',
        Id: '',

    }
    componentDidMount() {
        this.FetchData();
    }



    FetchData = () => {
        return fetch(`${this.props.BaseUrl}/readPaidListing`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ ListingData: responseData.doc })

            }).catch((err) => {
                alert(err.message)
            })


    }




    UpdateStatus = () => {
        let body =
        {
            id: this.state.Id,
            Status: this.state.Status
        }
        if (this.state.Status !== 'Select Status') {
            return fetch(`${this.props.BaseUrl == undefined ? console.log("chala") : `${this.props.BaseUrl}/UpdateStatus`}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body

            })
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData) {
                        this.setState({ ListingData: responseData.doc, ViewModal: false })
                        this.FetchData();
                    }


                }).catch((err) => {
                    alert(err.message)
                })
        }

        else {
            alert("plaese Select Status")
        }



    }




    renderList() {
        const { ListingData } = this.state;
        return ListingData.map((item, i) => {
            return (

                <tr key={i}>
                    <td >{item.currency}</td>
                    <td >{item.trade}</td>
                    <td>{item.National}</td>
                    <td>{item.shippingInternational}</td>
                    <td>{item.createdDate}</td>
                    <td>{item.isPro}</td>
                    <td>{item.Status}</td>


                    <td>
                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.props.UrlLink(this.state.Url)}><i className="icon feather icon-edit text-white" /> Update Status</a>
                    </td>

                </tr>

            )
        })
    }








    render() {
        return (
            <Aux>

                <Row>
                    <Col style={{ backgroundColor: 'white', padding: '20px 20px 5px 20px', margin: '10px 20px 30px 20px', boxShadow: '1px 1px 10px 2px #eeeeee' }} md={6} xl={6}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend className="bg-primary">
                                <InputGroup.Text id="basic-addon1"><i className="icon feather icon-search text-white" /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Search here" aria-label="Username" aria-describedby="basic-addon1" />
                        </InputGroup>
                    </Col>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Paid Listing </Card.Title>



                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>Currency</th>
                                            <th>Trade</th>
                                            <th>ShippingNational</th>
                                            <th>ShippingInternational</th>
                                            <th>CreatedDate</th>
                                            <th>isPro</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.renderList()}


                                    </tbody>


                                </Table>
                            </Card.Body>
                        </Card>


                        <Modal
                            show={this.state.ViewModal}
                            size="md"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ ViewModal: false }) }}>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Status
      </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control as="select" value={this.state.Status} onChange={(e) => { this.setState({ Status: e.target.value }) }}>
                                        <option>{this.state.Status}</option>
                                        <option>Completed</option>
                                        <option>Pending</option>
                                        <option>In Progress</option>
                                    </Form.Control>
                                </Form.Group>

                                <a href={DEMO.BLANK_LINK} style={{ float: 'right' }} onClick={this.UpdateStatus} className="label btn-sm bg-success text-white f-12" ><i className="icon feather icon-edit text-white" /> Update </a>
                            </Modal.Body>
                        </Modal>

                    </Col>


                </Row>
            </Aux>
        )
    }
}


const mapStateToProps = (state) => {

    return {

        BaseUrl: state.Baseurl,


    }


}


export default connect(mapStateToProps, null)(Listing);