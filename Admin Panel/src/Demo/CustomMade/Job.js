import React, { Component } from 'react'
import { Row, Col, Card, Table, Tabs, Tab, InputGroup, FormControl, Modal } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import { connect } from 'react-redux'



class Jobs extends Component {

    state = {
        ViewModal: false,
        count: 1,
        JobData: [],
        ProfilePic: '',
        BuyerName: '',
        BuyerEmail: '',
        JobDetail: '',
        JobCategory: '',
        JobTitle: '',
        Budget: '',
        Shipping: '',
        PostedDate: '',
        PostDetail: ''

    }

    componentDidMount() {
        this.getJob();


    }

    getJob = () => {
        fetch(`${this.props.BaseUrl==undefined?this.props.defaulturl:this.props.BaseUrl}/readjob`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ JobData: responseData })
            }).catch((err) => {
                alert(err.message)
            })

    }

    delete(item) {

        let body = {
            Id: item._id
        }
        fetch(`${this.props.BaseUrl==undefined?this.props.defaulturl:this.props.BaseUrl}/deletejob`, { method: "DELETE", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(response => {

                let data = this.state.JobData.filter(elem => {
                    return elem._id !== response._id;

                })
                this.setState({ JobData: data })


            }).catch(err => alert(err))



    }













    renderJobs() {
        const { JobData } = this.state;
        return JobData.map((item, i) => {
            return (

                <tr key={i}>
                    <img src={item.ProfilePic} style={{ width: 50, height: 50, borderRadius: 25 }} />
                    <td >{item.BuyerName}</td>
                    <td >{item.BuyerEmail}</td>
                    <td>{item.JobTitle}</td>
                    <td>{item.Budget}</td>
                    <td>{item.JobCategory}</td>
                    <td>{item.Shipping}</td>
                    <td>{item.PostedDate}</td>
                    <td>{item.JobDetail}</td>
                    <td>

                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ ViewModal: true, BuyerName: item.BuyerName, BuyerEmail: item.BuyerEmail, ProfilePic: item.ProfilePic, Budget: item.Budget, JobCategory: item.JobCategory, JobTitle: item.JobTitle, Shipping: item.Shipping, PostedDate: item.PostedDate, JobDetail: item.JobDetail })}><i className="icon feather icon-eye text-white" /> View</a>

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
                                <Card.Title as='h5'>Jobs</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>Buyer Image</th>
                                            <th>Buyer Name</th>
                                            <th>Buyer Email</th>
                                            <th>Job Title</th>
                                            <th>Budget</th>
                                            <th>JobCategory</th>
                                            <th>Shipping</th>
                                            <th>PostedDate</th>
                                            <th>JobDetail</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.renderJobs()}
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
                                    <h5 style={{ fontWeight: 'bold' }}>profilePic:<img src={this.state.ProfilePic} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                    </h5>
                                    <h5 style={{ fontWeight: 'bold' }}>Name:{this.state.BuyerName}</h5>
                                </div>
                                <h5 style={{ fontWeight: 'bold' }}>Email:{this.state.BuyerEmail}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>JobTitle:{this.state.JobTitle}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>Budget:{this.state.Budget}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>JobTitle:{this.state.JobTitle}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>JobCategory:{this.state.JobCategory}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>Shipping:{this.state.Shipping}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>PostedDate:{this.state.PostedDate}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>JobDetail:{this.state.JobDetail}</h5>

                            </div>
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
        defaulturl:state.url


    }


}


export default connect(mapStateToProps, null)(Jobs);