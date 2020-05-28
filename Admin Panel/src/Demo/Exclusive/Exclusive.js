import React, { Component } from 'react'
import { Row, Col, Card, Table, Tabs, Tab, InputGroup, FormControl, Modal, Form } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import {firebase} from '../../Config/Firebase'
import BaseUrl from '../Api/Api'





export default class Exclusive extends Component {

    state = {
        ViewModal: false,
        count: 1,
        ExclusiveData: [],
        CategoryData:[],
        Image: '',
        BusinessName: '',
        Contact: '',
        Category: '',
        BusinessDetail: '',
        Password: '',
        isRegistered: '',
        Country: '',
        Email: '',
        RegisterModal: false,
        updateModal: false,
        ImageModal: false,
        Id: '',
        SelectImage: [],
        Imageurl: ''


    }

    componentDidMount() {
        this.getExlusive();
        this.getCategory();


    }

    getExlusive = () => {
        fetch(`${BaseUrl}/readexclusiveuserdata`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((responseData) => {
                
                this.setState({ ExclusiveData: responseData })
            }).catch((err) => {
                alert(err.message)
            })


    }

    getCategory = () =>
    {
        fetch(`${BaseUrl}/readExclusivecategory`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("resp===>", responseData)
                this.setState({CategoryData:responseData })
            }).catch((err) => {
                alert(err.message)
            })

    }




    AddExclusive = () => {
        const { BusinessName, Image, Email, Contact, Category, Country, BusinessDetail, Password, isRegistered } = this.state;


        let body = {
            BusinessName: BusinessName,
            Email: Email,
            Contact: Contact,
            Category: Category,
            Country: Country,
            BusinessDetail: BusinessDetail,
            Image: Image,
            isRegistered: isRegistered


        }

        fetch(`${BaseUrl}/requestforregisteration`, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(response => {

                this.setState({ RegisterModal: false })


            }).catch(err => alert(err))
    }



    updateExclusive = (item) => {
        const { BusinessName, Contact, BusinessDetail, Password } = this.state;



        let body = {
            Id: this.state.Id,
            BusinessName: BusinessName,
            Password: Password,
            Contact: Contact,
            BusinessDetail: BusinessDetail,
        }

        fetch(`${BaseUrl}/updateexclusiveuserdata`, { method: "PUT", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(response => {
                this.setState({ updateModal: false })
                this.getExlusive();


            }).catch(err => alert(err))

    }





    editImage = () => {
        const { SelectImage } = this.state;
        var storageRef = firebase.storage().ref();
        var mountainImagesRef = storageRef.child(`ExlusiveImages/${SelectImage.name}`);

        mountainImagesRef.put(SelectImage).then(() => {
            mountainImagesRef.getDownloadURL().then((url) => {
                console.log("url===>", url)
                this.setState({ Imageurl: url })
                if (this.state.Imageurl !== '') {
                    let body =
                    {
                        Id: this.state.Id,
                        Image: this.state.Imageurl
                    }

                    fetch('`${BaseUrl}/changeprofileimage', { method: "PUT", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
                        .then(res => res.json())
                        .then(response => {
                            if (response) {
                                this.getExlusive();
                            }


                        }).catch(err => alert(err))
                }
                else {
                    alert("Image null")
                }

            })

        })



    }


    updateRegister  (item) 
    {
      let body=
      {
          Id:item._id
      }
      

        fetch(`${BaseUrl}/readAcceptRequest`, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
        .then(res => res.json())
        .then(response => {
          if(response)
          {
              this.getExlusive();
          }
        


        }).catch(err => alert(err))
    
    }

    renderExlusive() {
        const { ExclusiveData } = this.state;
        return ExclusiveData.map((item, i) => {
    
            return (

                <tr key={i}>
                    <img src={item.userImage} style={{ width: 50, height: 50, borderRadius: 25 }} />
                    <td >{item.BusinessName}</td>
                    <td >{item.Email}</td>
                    <td>{item.Contact}</td>
                    <td>{item.Category}</td>
                    <td>{item.Country}</td>
                    <td>{item.BusinessDetail}</td>
                    <td>{item.Password}</td>
                    <td>{item.isRegistered==true?<a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" ><i className="icon feather  icon-check text-white" /> Approved</a>
:<a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"  onClick={()=> this.updateRegister(item)}><i className="icon feather icon-x-circle text-white" /> Accept Approved</a>
}</td>

                    <td>
                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ ViewModal: true, Image: item.Image, BusinessName: item.BusinessName, Email: item.Email, Contact: item.Contact, Category: item.Category, Country: item.Country, BusinessDetail: item.BusinessDetail, Password: item.Password, isRegistered: item.isRegistered })}><i className="icon feather icon-eye text-white" /> View</a>
                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({ updateModal: true, Id: item._id })}><i className="icon feather icon-edit text-white" />  Update</a>
                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-primary text-white f-12" onClick={() => this.setState({ ImageModal: true, Image: item.Image, Id: item._id })}><i className="icon feather icon-trash-2 text-white" style={{color:'black'}} /> Change Image</a>

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
                                <Card.Title as='h5'>Exclusive</Card.Title>
                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-secondary text-white f-12" style={{ float: 'right' }} onClick={() => { this.setState({ RegisterModal: true }) }}><i className="icon feather icon-plus text-white" /> Register</a>

                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>Image</th>
                                            <th>BusinessName</th>
                                            <th> Email</th>
                                            <th>Contact</th>
                                            <th>Category</th>
                                            <th>Country</th>
                                            <th>BusinessDetail</th>
                                            <th>Password</th>
                                            <th>isRegistered</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.renderExlusive()}
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
                                Exlusive Details
      </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h5 style={{ fontWeight: 'bold' }}>Image:<img src={this.state.Image} style={{ width: 50, height: 50, borderRadius: 25 }} onClick={() => alert("done")} />
                                    </h5>
                                    <h5 style={{ fontWeight: 'bold' }}>BusinessName:{this.state.BusinessName}</h5>
                                </div>
                                <h5 style={{ fontWeight: 'bold' }}>Email:{this.state.Email}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>Contact:{this.state.Contact}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>Category:{this.state.Category}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>Country:{this.state.Country}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>BusinessDetail:{this.state.BusinessDetail}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>Password:{this.state.Password}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>isRegistered:{this.state.isRegistered}</h5>

                            </div>
                        </Modal.Body>
                    </Modal>


                    {/* Register Modal */}

                    <Modal
                        show={this.state.RegisterModal}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ RegisterModal: false }) }}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add Exclusive
      </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Image Url</Form.Label>
                                    <Form.Control type="text" placeholder="Url..." onChange={(e) => { this.setState({ Image: e.target.value }) }} />
                                </Form.Group>

                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Bussinees Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name..." onChange={(e) => { this.setState({ BusinessName: e.target.value }) }} />
                                </Form.Group>

                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="Email..." onChange={(e) => { this.setState({ Email: e.target.value }) }} />
                                </Form.Group>

                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Contact</Form.Label>
                                    <Form.Control type="text" placeholder="Contact" onChange={(e) => { this.setState({ Contact: e.target.value }) }} />
                                </Form.Group>



                                <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Category</Form.Label>
    <Form.Control as="select" onChange={(e)=>{this.setState({Category:e.target.value})}}>
    {this.state.CategoryData.map((item,i)=>{
        
    return (

        <option>{item.Name}</option>
        )
    })}
    </Form.Control>
  </Form.Group>

                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="text" placeholder="Country" onChange={(e) => { this.setState({ Country: e.target.value }) }} />
                                </Form.Group>


                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text" placeholder="Password" onChange={(e) => { this.setState({ Password: e.target.value }) }} />
                                </Form.Group>

                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>BusinessDetail</Form.Label>
                                    <Form.Control type="text" placeholder="Business Detail" onChange={(e) => { this.setState({ BusinessDetail: e.target.value }) }} />
                                </Form.Group>

                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>IsRegistered</Form.Label>
                                    <Form.Control type="boolean" placeholder="IsRegistered" onChange={(e) => { this.setState({ isRegistered: e.target.value }) }} />
                                </Form.Group>



                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={this.AddExclusive}><i className="icon feather icon-trash-2 text-white" />Add</a>

                            </Form>

                        </Modal.Body>
                    </Modal>


                    {/* Update Modal */}

                    <Modal
                        show={this.state.updateModal}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ updateModal: false }) }}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add Exclusive
      </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form>


                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Bussinees Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name..." onChange={(e) => { this.setState({ BusinessName: e.target.value }) }} />
                                </Form.Group>



                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Contact</Form.Label>
                                    <Form.Control type="text" placeholder="Contact" onChange={(e) => { this.setState({ Contact: e.target.value }) }} />
                                </Form.Group>





                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text" placeholder="Password" onChange={(e) => { this.setState({ Password: e.target.value }) }} />
                                </Form.Group>

                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>BusinessDetail</Form.Label>
                                    <Form.Control type="text" placeholder="Business Detail" onChange={(e) => { this.setState({ BusinessDetail: e.target.value }) }} />
                                </Form.Group>





                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={this.updateExclusive}><i className="icon feather icon-trash-2 text-white" />Add</a>

                            </Form>

                        </Modal.Body>
                    </Modal>


                    {/* Image Modal */}

                    <Modal
                        show={this.state.ImageModal}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ ImageModal: false }) }}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Change Profile Image
      </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Select Image</Form.Label>
                                <Form.Control type="file" placeholder="Select Image..." onChange={(e) => { this.setState({ SelectImage: e.target.files[0] }) }} />
                            </Form.Group>
                            <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={this.editImage}><i className="icon feather icon-trash-2 text-white" />Edit</a>

                        </Modal.Body>
                    </Modal>




                </Row>
            </Aux>
        )
    }
}

