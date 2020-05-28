import React, { Component } from 'react'
import {Row, Col, Card, Table, Tabs, Tab, Button, Modal ,InputGroup, FormControl,Form} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";

import DEMO from "../../store/constant";

export default class Packages extends Component {
    state={
        showModal:false,
        showEditModal:false
    }

    render() {
        return (
            <Aux>
                <Row style={{backgroundColor:'white',padding:'20px 20px 5px 20px',margin:5,boxShadow:'1px 1px 10px 2px #eeeeee'}}>
                    <Col md={4} xl={6}>
                        <Button variant="primary" onClick={() => this.setState({showModal:true})}  className="label bg-primary text-white f-12"><i className="icon feather icon-plus"/> Add Package</Button>
                    </Col>
                    <Col md={8} xl={6}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend className="bg-primary">
                                <InputGroup.Text id="basic-addon1"><i className="icon feather icon-search text-white"/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Title" aria-label="Title" aria-describedby="basic-addon1"/>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    
                    <Col md={12} xl={12} style={{marginTop:20}}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Packages</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Limit</th>
                                            <th>Clicks</th>
                                            <th>Refferal Clicks</th>
                                            <th>Ads</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Standard</td>
                                            <td>4000</td>
                                            <td>2 mon</td>
                                            <td>5.76</td>
                                            <td>0.67</td>
                                            <td>40</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({showEditModal:true})}><i className="icon feather icon-edit text-white"/> Edit</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-trash-2 text-white"/> Delete</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Standard</td>
                                            <td>4000</td>
                                            <td>2 mon</td>
                                            <td>5.76</td>
                                            <td>0.67</td>
                                            <td>40</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({showEditModal:true})}><i className="icon feather icon-edit text-white"/> Edit</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-trash-2 text-white"/> Delete</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Standard</td>
                                            <td>4000</td>
                                            <td>2 mon</td>
                                            <td>5.76</td>
                                            <td>0.67</td>
                                            <td>40</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12"><i className="icon feather icon-edit text-white"/> Edit</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-trash-2 text-white"/> Delete</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>



                    <AddPackage
                        show={this.state.showModal}
                        onHide={() => this.setState({showModal:false})}
                    />

                    <EditPackage
                        show={this.state.showEditModal}
                        onHide={() => this.setState({showEditModal:false})}
                    />
                </Row>
            </Aux>
        )
    }
}


function AddPackage(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title id="contained-modal-title-vcenter">
            Add Package
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formGroupEmail">
                    <Form.Control type="text" placeholder="Title..." />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Control type="text" placeholder="Amount..." />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Control type="text" placeholder="Limit..." />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Row>
                        <Col lg={6} xl={6}>
                            <Form.Control type="text" placeholder="Clicks..." />
                        </Col>
                        <Col lg={6} xl={6}>
                            <Form.Control type="text" placeholder="Refferals Clicks..." />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Control type="text" placeholder="Daily Ads..." />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="label bg-success text-white f-12">Add Package</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  function EditPackage(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Package
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formGroupEmail">
                    <Form.Control type="text" placeholder="Title..." />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Control type="text" placeholder="Amount..." />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Control type="text" placeholder="Limit..." />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Row>
                        <Col lg={6} xl={6}>
                            <Form.Control type="text" placeholder="Clicks..." />
                        </Col>
                        <Col lg={6} xl={6}>
                            <Form.Control type="text" placeholder="Refferals Clicks..." />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Control type="text" placeholder="Daily Ads..." />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="label bg-success text-white f-12">Update Package</Button>
        </Modal.Footer>
      </Modal>
    );
  }