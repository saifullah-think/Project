import React, { Component } from 'react'
import {Row, Col, Card, Table, Tabs, Tab,InputGroup, FormControl,Modal,Form,Button} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";

import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

export default class ViewAdmins extends Component {

    state={
        showEditModal:false
    }

    render() {
        return (
            <Aux>
                <Row>
                    <Col style={{backgroundColor:'white',padding:'20px 20px 5px 20px',margin:'10px 20px 30px 20px',boxShadow:'1px 1px 10px 2px #eeeeee'}} md={6} xl={6}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend className="bg-primary">
                                <InputGroup.Text id="basic-addon1"><i className="icon feather icon-search text-white"/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                        </InputGroup>
                    </Col>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Admins</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                <thead className="bg-dark text-white">
                                        <tr>
                                            <th>User Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Mark</td>
                                            <td>abc@g.c</td>
                                            <td>abc</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({showEditModal:true})}><i className="icon feather icon-edit text-white"/> Edit</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-trash-2 text-white"/>  Delete</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Jacob</td>
                                            <td>abc@g.c</td>
                                            <td>abc</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({showEditModal:true})}><i className="icon feather icon-edit text-white"/> Edit</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-trash-2 text-white"/>  Delete</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Larry</td>
                                            <td>abc@g.c</td>
                                            <td>abc</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({showEditModal:true})}><i className="icon feather icon-edit text-white"/> Edit</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-trash-2 text-white"/>  Delete</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <EditAdmin
                        show={this.state.showEditModal}
                        onHide={() => this.setState({showEditModal:false})}
                    />
                </Row>
                
            </Aux>
        )
    }
}


function EditAdmin(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-dark text-white" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Admin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Role</Form.Label>
                    <Form.Control as="select">
                        <option>Manage Users</option>
                        <option>Manage Withdrawls</option>
                        <option>Manage Videos</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="label bg-success text-white f-12">Update</Button>
        </Modal.Footer>
      </Modal>
    );
  }