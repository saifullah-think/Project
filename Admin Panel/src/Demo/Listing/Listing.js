import React, { Component } from 'react'
import { Row, Col, Card, Table, Tabs, Tab, InputGroup, FormControl, Modal } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import { connect } from 'react-redux'


class Listing extends Component {

    state = {
        ViewModal: false,
        count: 1,
        ListingData: [],
        Category: '',
        SubCategory: '',
        Title: '',
        Price: '',
        shippingInternational: '',
        shippingNational: '',
        description: '',
        Pic: '',
        latitude: '',
        longitude: ''


    }

    componentDidMount() {

        this.FetchListing();
    }


    FetchListing = () => {
        fetch(`${this.props.BaseUrl==undefined?this.props.defaulturl:this.props.BaseUrl}/api/getListings:${this.state.count}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((responseData) => {

                this.setState({ ListingData: responseData.data })
            }).catch((err) => {
                alert(err.message)
            })


    }

    delete(item) {
        let body = {
            id: item._id
        }
        fetch(`${this.props.BaseUrl==undefined?this.props.defaulturl:this.props.BaseUrl}/api/deleteListing`, { method: "DELETE", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(response => {
                let data = this.state.ListingData.filter((list => {
                    return list._id !== response.data._id
                }))
                this.setState({
                    ListingData: data
                })
            }).catch(err => alert(err))



    }




    SearchList(e) {
        if (e.target.value.length == 0) {
            this.FetchListing();


        }
        else {
            let body =
            {
                title: e.target.value
            }
            fetch(`${this.props.BaseUrl==undefined?this.props.defaulturl:this.props.BaseUrl}/api/searchListing`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)

            })
                .then((response) => response.json())
                .then((responseData) => {
                    this.setState({ ListingData: responseData.doc })
                }).catch((err) => {
                    alert(err.message)
                })


        }
    }




    renderListing() {
        const { ListingData } = this.state;
        return ListingData.map((item, i) => {
            return (
                this.state.ListingData.length ?
                    <tr key={i}>
                        <td >{item.Category}</td>
                        <td >{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.currency}</td>
                        <td>{item.createdDate}</td>
                        <td>{item.trade}</td>


                        <td>

                            <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({
                                ViewModal: true, Category: item.Category, SubCategory: item.subCategory, title: item.title, description: item.description,
                                shippingInternational: item.shippingInternational, shippingNational: item.shippingNational, latitude: item.geometry.coordinates[0], longitude: item.geometry.coordinates[1], Pic: item.imageLinks[0]
                            })}><i className="icon feather icon-eye text-white" /> View</a>
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
                                <InputGroup.Text id="basic-addon1"><i className="icon feather icon-plus text-white" /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Search here" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => this.SearchList(e)} />
                        </InputGroup>
                    </Col>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Listing</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>Category</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Currency</th>
                                            <th>Date</th>
                                            <th>Trade</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.renderListing()}


                                    </tbody>
                                    {/* <a href={DEMO.BLANK_LINK} style={{float:'right'}} className="label btn-sm bg-primary text-white f-12 " onClick={() => this.setState({count:this.state.count+1})}><i className="icon feather 2 text-white" /> Next</a> */}




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
                                Detail
      </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h5 style={{ fontWeight: 'bold' }}>ProductImage:<img src={this.state.Pic} style={{ width: 50, height: 50, borderRadius: 25 }} /></h5>
                                </div>
                                <h5 style={{ fontWeight: 'bold' }}>Category:{this.state.Category}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>SubCategory:{this.state.SubCategory}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>Title:{this.state.Title}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>Description:{this.state.description}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>shippingNational:{this.state.shippingNational}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>shippingNational:{this.state.shippingInternational}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>Latitude:{this.state.latitude}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>Longitude:{this.state.longitude}</h5>


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


export default connect(mapStateToProps, null)(Listing);