import React, { Component } from 'react'
import { Row, Col, Card, Table, Tabs, Tab, InputGroup, FormControl, Modal } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import BaseUrl from '../Api/Api'

export default class ApprovedUsers extends Component {

    state = {
        ViewModal: false,
        count: 1,
        UserData: [],
        Firstname: '',
        email: '',
        Pic: '',
        flag: false,
        selectedindex: ''
    }

    componentDidMount() {
        this.getAllUser();
  

    }

    getAllUser = () =>
    {
        fetch(`${BaseUrl}/api/getUsers:${this.state.count}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ UserData: responseData.data })
            }).catch((err) => {
                alert(err.message)
            })

    }

    delete(item) {

        let body = {
            uid: item.firebaseUID
        }
        fetch(`${BaseUrl}/api/deleteAdminOrUSer`, { method: "DELETE", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(response => {
                console.log(response)

                let data=this.state.UserData.filter(elem=>{
                    return elem._id !==response.data._id;
        
                })
                console.log(data.length);
                this.setState({UserData:data})


            }).catch(err => alert(err))



    }


    Blockuser(item, i) {
        this.setState({ selectedindex: i })
        let body = {
            uid: item.firebaseUID
        }

        fetch(`${BaseUrl}/api/bloclkuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)

        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("Res====>", responseData)
                this.setState({ flag: true })
            }).catch((err) => {
                alert(err.message)
            })




    }



    UnblockUser(item, i) {

        this.setState({ selectedindex: !i })

        let body = {
            uid: item.firebaseUID
        }


        fetch(`${BaseUrl}/api/Unbloclkuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)

        })
            .then((response) => response.json())
            .then((responseData) => {

            }).catch((err) => {
                alert(err.message)
            })



    }

    SearchUser(e) {
        let body = {
            name: e.target.value
        }

        fetch(`${BaseUrl}/api/userSearch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)

        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ UserData: responseData.doc })
            }).catch((err) => {
                alert(err.message)
            })

    }



    renderUser() {
        const { UserData } = this.state;
        return UserData.map((item, i) => {
            return (
                this.state.UserData.length ?
                    <tr key={i}>
                        <img src={item.profilePic} style={{ width: 50, height: 50, borderRadius: 25 }} />
                        <td >{item.fName}</td>
                        <td >{item.email}</td>
                        <td>{item.isPRO}</td>
                        <td>

                            <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ ViewModal: true, Firstname: item.fName, email: item.email, Pic: item.profilePic })}><i className="icon feather icon-eye text-white" /> View</a>

                            {this.state.selectedindex !== i ? <a href={DEMO.BLANK_LINK} className="label btn-sm bg-primary text-white f-12" onClick={() => this.Blockuser(item, i)}><i className="icon feather icon-ban text-white" />Block</a>
                                : <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.UnblockUser(item, i)}><i className="icon feather icon-trash-2 text-white" />UnBlock</a>
                            }

                            <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12" onClick={() => this.delete(item)}><i className="icon feather icon-trash-2 text-white" /> Delete</a>
                        </td>



                    </tr>
                    : <p className="text-center" style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>No Record Found</p>
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
                            <FormControl placeholder="Search here" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => this.SearchUser(e)} />
                        </InputGroup>
                    </Col>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Users</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>User Image</th>
                                            <th>First Name</th>
                                            <th>Email</th>
                                            <th>Package</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.renderUser()}
                                    </tbody>

                                </Table>
                            </Card.Body>
                        </Card>

                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-primary text-white f-12 " onClick={() =>{console.log(this.state.count)}}><i className="icon feather 2 text-white" /> Next</a>

                    </Col>



                    <Modal
                        show={this.state.ViewModal}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ ViewModal: false }) }}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Withdraw Detail
      </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h5 style={{ fontWeight: 'bold' }}>profilePic:<img src={this.state.Pic} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                    </h5>
                                    <h5 style={{ fontWeight: 'bold' }}>First Name:{this.state.Firstname}</h5>
                                </div>
                                <h5 style={{ fontWeight: 'bold' }}>Email:{this.state.email}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>City:  Karachi</h5>
                            </div>
                        </Modal.Body>
                    </Modal>
                </Row>
            </Aux>
        )
    }
}

