import React, { Component } from 'react'
import {Row, Col, Card, Table, Tabs, Tab, Button, Modal ,InputGroup, FormControl,Form} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";

import DEMO from "../../store/constant";

export default class Videos extends Component {
    state={
        showAddModal:false,
        showEditModal:false,
        showViewModal:false,
    }

    render() {
        return (
            <Aux>
                <Row style={{backgroundColor:'white',padding:'20px 20px 5px 20px',margin:5,boxShadow:'1px 1px 10px 2px #eeeeee'}}>
                    <Col md={4} xl={6}>
                        <Button variant="primary" onClick={() => this.setState({showAddModal:true})}  className="label bg-primary text-white f-12"><i className="icon feather icon-upload"/> Upload Video</Button>
                    </Col>
                    <Col md={8} xl={6}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend className="bg-primary">
                                <InputGroup.Text id="basic-addon1"><i className="icon feather icon-search text-white"/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Title" aria-label="Title" aria-describedby="basic-addon1"/>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    
                    <Col md={12} xl={12} style={{marginTop:20}}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Videos</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>Title</th>
                                            <th>Video Url</th>
                                            <th>Views</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Mark</td>
                                            <td>www.youtube.com</td>
                                            <td>111</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({showViewModal:true})} ><i className="icon feather icon-eye text-white"/> View</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({showEditModal:true})} ><i className="icon feather icon-edit text-white"/> Edit</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-trash-2 text-white"/> Delete</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Jacob</td>
                                            <td>www.youtube.com</td>
                                            <td>111</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({showViewModal:true})} ><i className="icon feather icon-eye text-white"/> View</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({showEditModal:true})} ><i className="icon feather icon-edit text-white"/> Edit</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-trash-2 text-white"/> Delete</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Larry</td>
                                            <td>www.youtube.com</td>
                                            <td>111</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({showViewModal:true})} ><i className="icon feather icon-eye text-white"/> View</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({showEditModal:true})} ><i className="icon feather icon-edit text-white"/> Edit</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-trash-2 text-white"/> Delete</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>



                    <AddVideo
                        show={this.state.showAddModal}
                        onHide={() => this.setState({showAddModal:false})}
                    />

                    <EditVideo
                        show={this.state.showEditModal}
                        onHide={() => this.setState({showEditModal:false})}
                    />


                    <ViewVideo
                        show={this.state.showViewModal}
                        onHide={() => this.setState({showViewModal:false})}
                    />

                    
                </Row>
            </Aux>
        )
    }
}


function AddVideo(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-dark text-white" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload video
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Video Title</Form.Label>
                    <Form.Control type="text" placeholder="Title..." />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Video Url</Form.Label>
                    <Form.Control type="text" placeholder="Url..." />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="label bg-success text-white f-12">Upload</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  function EditVideo(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-dark text-white" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit video
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Video Title</Form.Label>
                    <Form.Control type="text" placeholder="Title..." />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Video Url</Form.Label>
                    <Form.Control type="text" placeholder="Url..." />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="label bg-success text-white f-12">Update</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  function ViewVideo(props) {
    return (
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-dark text-white" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            video
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Video
        </Modal.Body>>
      </Modal>
    );
  }