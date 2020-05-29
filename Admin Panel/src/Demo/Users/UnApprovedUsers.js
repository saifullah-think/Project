import React, { Component } from 'react'
import { Row, Col, Card, Table, Tabs, Tab, InputGroup, FormControl, Modal } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

export default class UnApprovedUsers extends Component {

    state = {
        ViewModal: false
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
                            <FormControl placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </InputGroup>
                    </Col>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>User Requests</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>City</th>
                                            <th>Package</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Mark</td>
                                            <td>zinger</td>
                                            <td>abc@g.c</td>
                                            <td>Karachi</td>
                                            <td>abc</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ ViewModal: true })}><i className="icon feather icon-eye text-white" /> View</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12"><i className="icon feather icon-check text-white" /> Accept</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-x-circle text-white" /> Reject</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Jacob</td>
                                            <td>Abad</td>
                                            <td>abc@g.c</td>
                                            <td>Lahore</td>
                                            <td>abc</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ ViewModal: true })}><i className="icon feather icon-eye text-white" /> View</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12"><i className="icon feather icon-check text-white" /> Accept</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-x-circle text-white" /> Reject</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Larry</td>
                                            <td>Ortan</td>
                                            <td>abc@g.c</td>
                                            <td>Quetta</td>
                                            <td>abc</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ ViewModal: true })}><i className="icon feather icon-eye text-white" /> View</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12"><i className="icon feather icon-check text-white" /> Accept</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-x-circle text-white" /> Reject</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>


                    <ViewModal
                        show={this.state.ViewModal}
                        onHide={() => this.setState({ ViewModal: false })}
                    />
                </Row>
            </Aux>
        )
    }
}

function ViewModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="bg-dark text-white" closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Withdraw Detail
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h5 style={{ fontWeight: 'bold' }}>First Name: Syed</h5>
                        <h5 style={{ fontWeight: 'bold' }}>Last Name: Sherazi</h5>
                    </div>
                    <h5 style={{ fontWeight: 'bold' }}>Email: abc@g.c</h5>
                    <h5 style={{ fontWeight: 'bold' }}>City:  Karachi</h5>
                </div>
            </Modal.Body>
        </Modal>
    );
}
