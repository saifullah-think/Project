import React, { Component } from 'react'
import { Row, Col, Card, Table, Tabs, Tab, Form, Button } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";

export default class CreateAdmin extends Component {


    state =
        {
            Name: '',
            Email: '',
            Password: '',
            Role: ''
        }

    CreateAdmin = () => {

        const { Role, Name, Password, Email } = this.state;

        let body =
        {
            name: Name,
            email: Email,
            password: Password,
            usertype: Role
        }
        console.log("body--->", body)

        if (Name !== '' || Email !== '' || Password !== '' || Role !== '') {
            fetch('http://localhost:5000/CreateAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Credentials":"true",
                    'Access-Control-Allow-Origin':'http://localhost:5000'
                },
                body:JSON.stringify(body)

            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log("dddd========>", responseData)
                }).catch((err) => {
                    alert(err.message)
                })
        }

        else {
            alert("plaese Filled Out field")
        }
    }


    render() {
        return (
            <Aux>
                <Row style={{ marginTop: 50, margin: '10px 0px 10px 0px' }} className="justify-content-md-center">
                    <Col style={{ backgroundColor: 'white', boxShadow: '1px 1px 10px 2px #eeeeee', padding: 30 }} md={8} lg={6} xl={4}>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlInput2">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="Name" placeholder="abc" onChange={(e) => { this.setState({ Name: e.target.value }) }} />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlInput2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" required onChange={(e) => { this.setState({ Email: e.target.value }) }} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => { this.setState({ Password: e.target.value }) }} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Select Role</Form.Label >
                                <Form.Control as="select" onChange={(e) => { this.setState({ Role: e.target.value }) }}>
                                    <option>Admin </option>
                                    <option>Sub Admin</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="info" style={{ marginTop: 50 }} className="btn-block" onClick={this.CreateAdmin}>
                                Create
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Aux>
        )
    }
}
