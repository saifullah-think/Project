import React, { Component } from 'react'
import { Row, Col, Card, Table, Tabs, Tab, InputGroup, FormControl, Modal, Form } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import { connect } from 'react-redux'





class ExclusiveService extends Component {

    state = {
        ViewModal: false,
        count: 1,
        ExclusiveServiceData: [],
        Image: '',
        Price: '',
        Category: '',
        ServiceTitle: '',
        ServiceDescription: '',
        Date: '',
        userImage: '',
        userName: '',
        userDetail: '',
        userCountry: '',
        totalRatings: '',
        RegisterModal: false,
        updateModal: false,
        ImageModal: false,
        Id: '',
        SelectImage: [],
        Imageurl: '',
        Reviews: [],
        index: 0,
        reviewModal: false
    }

    componentDidMount() {
        this.getExclusiveServiceData();


    }

    getExclusiveServiceData = () => {
        fetch(`${this.props.BaseUrl}/readexclusiveservices`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((responseData) => {

                this.setState({ ExclusiveServiceData: responseData })
            }).catch((err) => {
                alert(err.message)
            })

    }




    AddExclusiveServices = () => {
        const { Image, ServiceTitle, Price, Category, ServiceDescription, Date, totalRatings, userImage, userName, userDetail, userCountry, Reviews } = this.state;


        let body = {
            ServiceTitle: ServiceTitle,
            Price: Price,
            Category: Category,
            ServiceDescription: ServiceDescription,
            Images: Image,
            Date: Date,
            totalRatings: totalRatings,
            Reviews: Reviews,
            userName: userName,
            userCountry: userCountry,
            userDetail: userDetail,
            userImage: userImage


        }

        fetch(`${this.props.BaseUrl}/addexclusiveservice`, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(response => {

                this.setState({ RegisterModal: false })


            }).catch(err => alert(err))
    }



    renderReviews = (item) => {
        this.setState({ Reviews: item.Reviews, reviewModal: true })
    }


    renderExlusiveServices() {
        const { ExclusiveServiceData } = this.state;
        return ExclusiveServiceData.map((item, i) => {
            return (

                <tr>

                    <td><img src={item.Images} style={{ width: 50, height: 50, borderRadius: 25 }} /></td>                      <td >{item.ServiceTitle}</td>
                    <td >{item.Price}</td>
                    <td>{item.Category}</td>
                    <td>{item.ServiceDescription}</td>
                    <td>{item.Date}</td>
                    <td>{item.totalRatings}</td>
                    <img src={item.userImage} style={{ width: 50, height: 50, borderRadius: 25 }} />
                    <td>{item.userName}</td>
                    <td>{item.userCountry}</td>
                    <td>{item.userDetail}</td>

                    <td>
                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ ViewModal: true, Image: item.Images, ServiceTitle: item.ServiceTitle, Price: item.Price, Category: item.Category, ServiceDescription: item.ServiceDescription, Date: item.Date, totalRatings: item.totalRatings, userImage: item.userImage, userCountry: item.userCountry, userDetail: item.userDetail })}><i className="icon feather icon-eye text-white" /> View</a>
                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-primary text-white f-12" onClick={() => this.renderReviews(item)}><i className="icon feather icon-thumbs-up text-white" /> Reviews</a>
                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({ updateModal: true, Id: item._id })}><i className="icon feather icon-edit text-white" /> Update</a>
                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12" onClick={() => this.delete(item)}><i className="icon feather icon-trash-2 text-white" /> Delete</a>


                    </td>



                </tr>
            )
        })


    }

    delete(item) {
        let body = {
            Id: item._id
        }
        fetch(`${this.props.BaseUrl}/deleteexclusiveservice`, { method: "DELETE", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(response => {
                let data = this.state.ExclusiveServiceData.filter((list => {
                    return list._id !== response._id
                }))

                this.setState({
                    ExclusiveServiceData: data
                })
            }).catch(err => alert(err))



    }

    render() {
        const { Reviews } = this.state;
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
                                <Card.Title as='h5'>Exclusive Services</Card.Title>
                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-dark text-white f-12" style={{ float: 'right' }} onClick={() => { this.setState({ RegisterModal: true }) }}><i className="icon feather icon-plus text-white" /> Register</a>

                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>Image</th>
                                            <th>ServiceTitle</th>
                                            <th> Price</th>
                                            <th>Category</th>
                                            <th>ServiceDescription</th>
                                            <th>Date</th>
                                            <th>TotalRatings</th>
                                            {/* <th>Reviews</th> */}
                                            <th>UserImage</th>
                                            <th>Username</th>
                                            <th>userCountry</th>
                                            <th>userDetail</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.renderExlusiveServices()}
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
                                    <h5 style={{ fontWeight: 'bold' }}>ServiceTitle:{this.state.ServiceTitle}</h5>
                                </div>
                                <h5 style={{ fontWeight: 'bold' }}>Price:{this.state.Price}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>Category:{this.state.Category}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>ServiceDescription:{this.state.ServiceDescription}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>Date:{this.state.Date}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>TotalRatings:{this.state.totalRatings}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>UserImage:{this.state.userImage}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>userCountry:{this.state.userCountry}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>userDetail:{this.state.userDetail}</h5>


                            </div>
                        </Modal.Body>
                    </Modal>


                    {/* Reviews modal */}

                    <Modal
                        show={this.state.reviewModal}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ reviewModal: false }) }}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Reviews
      </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.Reviews && this.state.Reviews.map((item, i) => {
                                return <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h5 style={{ fontWeight: 'bold' }}>Image:<img src={item.buyerImage} style={{ width: 50, height: 50, borderRadius: 25 }} onClick={() => alert("done")} /></h5>
                                        <h5 style={{ fontWeight: 'bold' }}>BuyerName:{item.buyerName} </h5>
                                    </div>
                                    <h5 style={{ fontWeight: 'bold' }}>Date:{this.state.Date}</h5>
                                    <h5 style={{ fontWeight: 'bold' }}>Message:{item.Messege}</h5>
                                    <h5 style={{ fontWeight: 'bold' }}>Rating:{item.Ratings}</h5>



                                </div>
                            })}
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
                                Add Exclusive-Services
      </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="text" placeholder="Url..." onChange={(e) => { this.setState({ Image: e.target.value }) }} />
                                </Form.Group>

                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>ServiceTitle</Form.Label>
                                    <Form.Control type="text" placeholder="ServiceTitle..." onChange={(e) => { this.setState({ ServiceTitle: e.target.value }) }} />
                                </Form.Group>

                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" placeholder="Price..." onChange={(e) => { this.setState({ Price: e.target.value }) }} />
                                </Form.Group>

                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" placeholder="Category" onChange={(e) => { this.setState({ Category: e.target.value }) }} />
                                </Form.Group>



                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>ServiceDescription</Form.Label>
                                    <Form.Control type="text" placeholder="ServiceDescription" onChange={(e) => { this.setState({ ServiceDescription: e.target.value }) }} />
                                </Form.Group>

                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="text" placeholder="Date" onChange={(e) => { this.setState({ Date: e.target.value }) }} />
                                </Form.Group>


                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>TotalRatings</Form.Label>
                                    <Form.Control type="text" placeholder="TotalRatings" onChange={(e) => { this.setState({ totalRatings: e.target.value }) }} />
                                </Form.Group>

                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>UserImage</Form.Label>
                                    <Form.Control type="text" placeholder="UserImage" onChange={(e) => { this.setState({ userImage: e.target.value }) }} />
                                </Form.Group>

                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="boolean" placeholder="Username" onChange={(e) => { this.setState({ userName: e.target.value }) }} />
                                </Form.Group>


                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="boolean" placeholder="Country" onChange={(e) => { this.setState({ userCountry: e.target.value }) }} />
                                </Form.Group>




                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>User Detail</Form.Label>
                                    <Form.Control type="boolean" placeholder="User Detail" onChange={(e) => { this.setState({ userDetail: e.target.value }) }} />
                                </Form.Group>



                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={this.AddExclusiveServices}><i className="icon feather icon-trash-2 text-white" />Add</a>

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

const mapStateToProps = (state) => {

    return {

        BaseUrl: state.Baseurl,


    }


}


export default connect(mapStateToProps, null)(ExclusiveService);