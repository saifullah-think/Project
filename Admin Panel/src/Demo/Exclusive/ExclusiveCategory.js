import React, { Component } from 'react'
import { Row, Col, Card, Table, Tabs, Tab, InputGroup, FormControl, Modal, Form } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import { connect } from 'react-redux'






class ExclusiveCategory extends Component {

    state = {
        Addmodal: false,
        Name: '',
        ExclusiveCategoryData: []


    }

    componentDidMount() {
        this.getExlusiveCategory();


    }

    getExlusiveCategory = () => {
        fetch(`${this.props.BaseUrl}/readExclusivecategory`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ ExclusiveCategoryData: responseData })
            }).catch((err) => {
                alert(err.message)
            })

    }




    AddExclusive = () => {
        const { Name } = this.state;


        let body = {
            Name: Name,

        }

        fetch(`${this.props.BaseUrl}/addExclusiveCategory`, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(response => {
                if (response) {
                    this.getExlusiveCategory();
                }

                this.setState({ Addmodal: false })


            }).catch(err => alert(err))
    }







    delete(item) {

        let body = {
            Id: item._id
        }
        fetch(`${this.props.BaseUrl}/deleteExclusivecategory`,
            {
                method: "DELETE",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json())
            .then(response => {

                let data = this.state.ExclusiveCategoryData.filter(elem => {
                    return elem._id !== response._id;

                })
                this.setState({ ExclusiveCategoryData: data })


            }).catch(err => alert(err))



    }

    updateExclusiveCategory = () => {
        const { Name } = this.state;



        let body = {
            Id: this.state.Id,
            Name: Name,
        }

        fetch(`${this.props.BaseUrl}/updateexclusiveCategory`, { method: "PUT", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(response => {
                this.setState({ updateModal: false })
                this.getExlusiveCategory();


            }).catch(err => alert(err))

    }







    renderExlusiveCategory() {
        const { ExclusiveCategoryData } = this.state;
        return ExclusiveCategoryData.map((item, i) => {
            return (

                <tr key={i}>
                    <td >{item.Name}</td>

                    <td>
                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({ updateModal: true, Id: item._id, Name: item.Name })}><i className="icon feather icon-edit text-white" /> Update</a>
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
                                <Card.Title as='h5'>Exclusive Category</Card.Title>
                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-dark text-white f-12" style={{ float: 'right' }} onClick={() => { this.setState({ Addmodal: true }) }}><i className="icon feather icon-plus text-white" />  Add ExclusiveCategory</a>

                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>Name</th>

                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.renderExlusiveCategory()}
                                    </tbody>

                                </Table>
                            </Card.Body>
                        </Card>


                    </Col>








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
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name..." value={this.state.Name} onChange={(e) => { this.setState({ Name: e.target.value }) }} />
                                </Form.Group>





                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={this.updateExclusiveCategory}><i className="icon feather icon-trash-2 text-white" />Update</a>

                            </Form>

                        </Modal.Body>
                    </Modal>


                    {/* Addmodal */}

                    <Modal
                        show={this.state.Addmodal}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ Addmodal: false }) }}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Change Profile Image
      </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name..." onChange={(e) => { this.setState({ Name: e.target.value }) }} />
                            </Form.Group>

                            <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={this.AddExclusive}><i className="icon feather icon-trash-2 text-white" />Add</a>

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


export default connect(mapStateToProps, null)(ExclusiveCategory);
