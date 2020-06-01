import React, { Component } from 'react'
import {Row, Col, Card, Table, Tabs, Tab,InputGroup, FormControl,Modal,Form,Button} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

export default class ViewAdmins extends Component {

    state={
        showEditModal:false,
        ViewModal:false,
        AdminData:[],
        AdminName:'',
        AdminEmail:'',
    }




    componentDidMount()
    {
        return fetch('http://localhost:5000/getAllAdmin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("Response===>",responseData)
                this.setState({AdminData:responseData.doc})
             


            }).catch((err) => {
                alert(err.message)
            })

    }



delete (item)
{
    let body=
    {
        id:item._id
    }

    fetch(`http://localhost:5000/deleteAdmin`,
    {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(response => {
        console.log("response==>",response)
        let data = this.state.AdminData.filter((elem => {
            return elem._id != response.data._id;
        }))
        this.setState({ AdminData: data })


    }).catch(err => alert(err))

}


    renderAdmin = () =>
    {
        const {AdminData}=this.state;
        return AdminData.map((item, i) => {
          return (
  
              <tr key={i}>
                  <td >{item.Name}</td>
                  <td >{item.Email}</td>
                  <td>
                  <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ViewModal:true,AdminEmail:item.Email,AdminName:item.Name})}><i className="icon feather icon-eye text-white"/> View</a>  
                 <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12" onClick={() =>this.delete(item)}><i className="icon feather icon-trash-2 text-white"/>  Delete</a>
                  </td>
  
              </tr>
  
  
  )
})


    
    }

 

    render() {
        return (
            <Aux>
                <Row>
                    <Col style={{backgroundColor:'white',padding:'20px 20px 5px 20px',margin:'10px 20px 30px 20px',boxShadow:'1px 1px 10px 2px #eeeeee'}} md={6} xl={6}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend className="bg-primary">
                                <InputGroup.Text id="basic-addon1"><i className="icon feather icon-search text-white"/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
                        </InputGroup>
                    </Col>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Admins</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                <thead className="bg-dark text-white">
                                        <tr>
                                            <th>User Name</th>
                                            <th>Email</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderAdmin()}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
{/* 
                    <EditAdmin
                        show={this.state.showEditModal}
                        onHide={() => this.setState({showEditModal:false})}
                    /> */}
                </Row>
                



                <Modal
                            show={this.state.ViewModal}
                            size="md"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ ViewModal: false }) }}>
                                <Modal.Title id="contained-modal-title-vcenter">
                                Admin
      </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                 <h5 style={{ fontWeight: 'bold' }}>Email:{this.state.AdminEmail}</h5>
                                </div>
             
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                 <h5 style={{ fontWeight: 'bold' }}>Name:{this.state.AdminName}</h5>
                                </div>
             
                                

                            </div>
                        </Modal.Body>
                        </Modal>

            </Aux>
        )
    }
}


function EditAdmin(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-dark text-white" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Admin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Role</Form.Label>
                    <Form.Control as="select">
                        <option>Manage Users</option>
                        <option>Manage Withdrawls</option>
                        <option>Manage Videos</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="label bg-success text-white f-12">Update</Button>
        </Modal.Footer>
      </Modal>
    );
  }