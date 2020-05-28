import React, { Component } from 'react'
import {Row, Col, Card, Table, Tabs, Tab,Form,Button} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";

export default class CreateAdmin extends Component {
    render() {
        return (
            <Aux>
                <Row style={{marginTop:50,margin:'10px 0px 10px 0px'}} className="justify-content-md-center">
                    <Col style={{backgroundColor:'white',boxShadow:'1px 1px 10px 2px #eeeeee',padding:30}} md={8} lg={6} xl={4}>
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
                            <Button variant="info" type="submit" style={{marginTop:50}} className="btn-block">
                                Create
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Aux>
        )
    }
}
