import React, { Component } from 'react'
import {Row, Col, Card, Table, Tabs, Tab, Button, Modal ,InputGroup, FormControl,Dropdown,DropdownButton} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";

import DEMO from "../../store/constant";

export default class Withdraws extends Component {

    state={
        ViewModal:false
    }


    render() {
        return (
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Requests</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-12">
                                        <h1 className="f-w-bold d-flex m-b-0">249</h1>
                                    </div>

                                   
                                </div>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card >
                            <Card.Body>
                                <h6 className='mb-4'>Total Released</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-12">
                                        <h1 className="f-w-bold d-flex align-items-center m-b-0">32</h1>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Withdraws</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-12">
                                        <h1 className="f-w-bold d-flex align-items-center m-b-0">Rs.20000</h1>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Row>
                                    <Col lg={6} xl={6}>
                                        <Card.Title as='h5'>Withdraw Requests</Card.Title>
                                    </Col>
                                    <Col lg={6} xl={6} style={{display:'flex',justifyContent:'flex-end'}}>
                                        <DropdownButton variant="secondary" size="sm" id="dropdown-basic-button" title="Filter    ">
                                            <Dropdown.Item>All</Dropdown.Item>
                                            <Dropdown.Item>Released</Dropdown.Item>
                                            <Dropdown.Item>Rejected</Dropdown.Item>
                                        </DropdownButton>
                                        <Button variant="primary" size="sm"  className="label bg-primary text-white f-12"><i className="icon feather icon-download"/> Download XLS</Button>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>Account Title</th>
                                            <th>Account</th>
                                            <th>Amount</th>
                                            <th>Withdraw Date</th>
                                            <th>Mobile No.</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Mark</td>
                                            <td>Jazz Cash</td>
                                            <td>1600</td>
                                            <td>12-12-2020</td>
                                            <td>0333333</td>
                                            <td>Released</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ViewModal:true})}><i className="icon feather icon-eye text-white"/> View</a>
                                                {/* <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12"><i className="icon feather icon-check text-white"/> Accept</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-x-circle text-white"/> Reject</a> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Mark</td>
                                            <td>Jazz Cash</td>
                                            <td>1600</td>
                                            <td>12-12-2020</td>
                                            <td>0333333</td>
                                            <td>Pending</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ViewModal:true})}><i className="icon feather icon-eye text-white"/> View</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12"><i className="icon feather icon-check text-white"/> Release</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-x-circle text-white"/> Reject</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Mark</td>
                                            <td>Jazz Cash</td>
                                            <td>1600</td>
                                            <td>12-12-2020</td>
                                            <td>0333333</td>
                                            <td>Rejected</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ViewModal:true})}><i className="icon feather icon-eye text-white"/> View</a>
                                                {/* <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12"><i className="icon feather icon-check text-white"/> Accept</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-x-circle text-white"/> Reject</a> */}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <ViewModal
                        show={this.state.ViewModal}
                        onHide={() => this.setState({ViewModal:false})}
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
                <h5 style={{fontWeight:'bold'}}>Account Title: Sherazi</h5>
                <h5 style={{fontWeight:'bold'}}>Account: Jazz Cash</h5>
                <h5 style={{fontWeight:'bold'}}>Amount: 1600</h5>
            </div>
        </Modal.Body>
      </Modal>
    );
  }