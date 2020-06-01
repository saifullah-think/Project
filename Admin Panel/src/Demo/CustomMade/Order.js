import React, { Component } from 'react'
import { Row, Col, Card, Table, Tabs, Tab, InputGroup, FormControl, Modal } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import { connect } from 'react-redux'

class Order extends Component {

    state = {
        ViewModal: false,
        count: 1,
        OrderData: [],
        BuyerName: '',
        Amount: '',
        SellerName: '',
        EndDate: '',
        StartDate: '',
        Status: ''


    }

    componentDidMount() {
        this.getOrder();


    }

    getOrder = () => {
        fetch(`${this.props.BaseUrl==undefined?this.props.defaulturl:this.props.BaseUrl}/readorders`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ OrderData: responseData })
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













    renderOrder() {
        const { OrderData } = this.state;
        return OrderData.map((item, i) => {
            return (

                <tr key={i}>
                    <td >{item.BuyerName}</td>
                    <td >{item.Amount}</td>
                    <td>{item.EndDate}</td>
                    <td>{item.SellerName}</td>
                    <td>{item.StartDate}</td>
                    <td>{item.isComplete}</td>

                    <td>

                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ ViewModal: true, BuyerName: item.BuyerName, Amount: item.Amount, EndDate: item.EndDate, SellerName: item.SellerName, StartDate: item.StartDate, Status: item.isComplete })}><i className="icon feather icon-eye text-white" /> View</a>

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
                                <Card.Title as='h5'>Order</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>Buyer Name</th>
                                            <th>Amount</th>
                                            <th>End Date</th>
                                            <th>Seller Name</th>
                                            <th>Start Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.renderOrder()}
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
                                Order Detail
      </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h5 style={{ fontWeight: 'bold' }}>Name:{this.state.BuyerName}</h5>
                                </div>
                                <h5 style={{ fontWeight: 'bold' }}>Amount:{this.state.Amount}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>EndDate:{this.state.EndDate}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>SellerName:{this.state.SellerName}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>StartDate:{this.state.StartDate}</h5>
                                <h5 style={{ fontWeight: 'bold' }}>Status:{this.state.Status}</h5>


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
        defaulturl:state.url,


    }


}


export default connect(mapStateToProps, null)(Order);
