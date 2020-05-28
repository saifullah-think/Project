import React, { Component } from 'react'
import { Row, Col, Card, Table, Tabs, Tab, InputGroup, FormControl, Modal ,Form} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import BaseUrl from '../Api/Api'

export default class JobCategory extends Component {

    state = {
        ViewModal: false,
        count: 1,
        JobCategory: [],
        Name:'',
        Image:'',
        ImageUrl:'',
        AddModal:''
     

    }

    componentDidMount() {
        this.getJobCategory();


    }

    getJobCategory = () => {
        fetch(`${BaseUrl}/readcategory`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ JobCategory: responseData })
            }).catch((err) => {
                alert(err.message)
            })

    }

    delete(item) {

        let body = {
            Id: item._id
        }
        fetch(`${BaseUrl}/deletecategory`, { method: "DELETE", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(response => {
                console.log(response)

                let data = this.state.JobCategory.filter(elem => {
                    return elem._id !== response._id;

                })
                this.setState({ JobCategory: data })


            }).catch(err => alert(err))



    }


    AddJobCategory = () =>
    {
        let body=
        {
            Name:this.state.Name,
            Image:this.state.ImageUrl
        }

        if(this.state.Name !=='' || this.state.ImageUrl!=='')
        {
            
            fetch(`${BaseUrl}/addcategory`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(body)
                
            })
            .then((response) => response.json())
            .then((responseData) => {
             console.log(responseData)
            let data=this.state.JobCategory;
            data.push(responseData);
             this.setState({AddModal:false})
            }).catch((err) => {
                alert(err.message)
            })
        }
        else {alert("Please Enter Fileds")}
            
        }
        






    renderJobCategory()  {
        const { JobCategory} = this.state;
        return JobCategory.map((item, i) => {
            return (

                <tr key={i}>
                    <td><img src={item.Image} style={{ width: 50, height: 50, borderRadius: 25 }} /></td>
                    <td >{item.Name}</td>
                    <td>

                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ ViewModal: true, Name:item.Name,Image:item.Image })}><i className="icon feather icon-eye text-white" /> View</a>
                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({ ViewModal: true, BuyerName: item.BuyerName, BuyerEmail: item.BuyerEmail, ProfilePic: item.ProfilePic, Budget: item.Budget, JobCategory: item.JobCategory, JobTitle: item.JobTitle, Shipping: item.Shipping, PostedDate: item.PostedDate, JobDetail: item.JobDetail })}><i className="icon feather icon-edit text-white" /> Update</a>
                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12" onClick={() => this.delete(item)}><i className="icon feather icon-trash-2 text-white" /> Delete</a>
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
                            <FormControl placeholder="Search here" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => this.SearchUser(e)} />
                        </InputGroup>
                    </Col>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Jobs Category</Card.Title>
                                <a href={DEMO.BLANK_LINK} style={{float:'right'}} className="label btn-sm bg-dark text-white f-12" onClick={() => this.setState({ AddModal: true })}><i className="icon feather icon-plus text-white" /> Add Job-Category</a>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>Image</th>
                                            <th> Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.renderJobCategory()}
                                    </tbody>

                                </Table>
                            </Card.Body>
                        </Card>

            
                    </Col>



                    <Modal
                        show={this.state.ViewModal}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ ViewModal: false }) }}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Job Detail
      </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h5 style={{ fontWeight: 'bold' }}>profilePic:<img src={this.state.Image} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                    </h5>
                                    <h5 style={{ fontWeight: 'bold' }}>Name:{this.state.Name}</h5>
                                </div>
                              

                            </div>
                        </Modal.Body>
                    </Modal>





                    <Modal
                        show={this.state.AddModal}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ AddModal: false }) }}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Job Add-Category
      </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            
                        <Form>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name..." onChange={(e) => { this.setState({ Name: e.target.value }) }} />
                                </Form.Group>

                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Image Url</Form.Label>
                                    <Form.Control type="text" placeholder="Url..." onChange={(e) => { this.setState({ ImageUrl: e.target.value }) }} />
                                </Form.Group>

                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={this.AddJobCategory}><i className="icon feather icon-trash-2 text-white" />Add</a>

                                </Form>  

                        </Modal.Body>
                    </Modal>



                </Row>
            </Aux>
        )
    }
}

