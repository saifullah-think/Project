import React from 'react';
import NVD3Chart from 'react-nvd3';
import {connect} from 'react-redux'
import BaseUrl from '../Api/Api'
import {MyApiUrl} from '../../store/actions';
import {Row, Col, Card, Table, Tabs, Tab,Modal,Form} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";


const datum = [
    {
        key: "Cumulative Return",
        values: [
          {
            "label" : "1" ,
            "value" : 29.765957771107
          } ,
          {
            "label" : "2" ,
            "value" : 0
          } ,
          {
            "label" : "3" ,
            "value" : 32.807804682612
          } ,
          {
            "label" : "4" ,
            "value" : 196.45946739256
          } ,
          {
            "label" : "5" ,
            "value" : 0.19434030906893
          } ,
          {
            "label" : "6" ,
            "value" : 98.079782601442
          } ,
          {
            "label" : "7" ,
            "value" : 13.925743130903
          } ,
          {
            "label" : "8" ,
            "value" : 5.1387322875705
          },
          {
            "label" : "9" ,
            "value" : 29.765957771107
          } ,
          {
            "label" : "10" ,
            "value" : 0
          } ,
          {
            "label" : "11" ,
            "value" : 32.807804682612
          } ,
          {
            "label" : "12" ,
            "value" : 196.45946739256
          } ,
          {
            "label" : "13" ,
            "value" : 0.19434030906893
          } ,
          {
            "label" : "14" ,
            "value" : 98.079782601442
          } ,
          {
            "label" : "15" ,
            "value" : 13.925743130903
          } ,
          {
            "label" : "16" ,
            "value" : 5.1387322875705
          },
          {
            "label" : "17" ,
            "value" : 29.765957771107
          } ,
          {
            "label" : "18" ,
            "value" : 0
          } ,
          {
            "label" : "19" ,
            "value" : 32.807804682612
          } ,
          {
            "label" : "20" ,
            "value" : 196.45946739256
          } ,
          {
            "label" : "21" ,
            "value" : 0.19434030906893
          } ,
          {
            "label" : "22" ,
            "value" : 98.079782601442
          } ,
          {
            "label" : "23" ,
            "value" : 13.925743130903
          } ,
          {
            "label" : "24" ,
            "value" : 5.1387322875705
          },
          {
            "label" : "25" ,
            "value" : 32.807804682612
          } ,
          {
            "label" : "26" ,
            "value" : 196.45946739256
          } ,
          {
            "label" : "27" ,
            "value" : 0.19434030906893
          } ,
          {
            "label" : "28" ,
            "value" : 98.079782601442
          } ,
          {
            "label" : "29" ,
            "value" : 13.925743130903
          } ,
          {
            "label" : "30" ,
            "value" : 5.1387322875705
          }
        ]
      }
    ];

class Dashboard extends React.Component {

    state={
      ViewModal:false,
      Url:''
    }

 


    render() {
        return (
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <Card className="bg-info text-white">
                            <Card.Body>
                                <h6 className='mb-4 text-white'>Total Users</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-8">
                                        <h1 className="f-w-bold d-flex align-items-center m-b-0 text-white">249</h1>
                                    </div>

                                    <div className="col-4 text-right">
                                        <i className="feather icon-users f-80"/>
                                    </div>
                                </div>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card className="bg-warning text-white">
                            <Card.Body>
                                <h6 className='mb-4 text-white'>Total Videos</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-8">
                                        <h1 className="f-w-bold d-flex align-items-center m-b-0 text-white">32</h1>
                                    </div>

                                    <div className="col-4 text-right">
                                        <i className="feather icon-film f-80 m-r-20"/>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card className="bg-success text-white">
                            <Card.Body>
                                <h6 className='mb-4 text-white'>Total Packages</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-8">
                                        <h1 className="f-w-bold d-flex align-items-center m-b-0 text-white">12</h1>
                                    </div>

                                    <div className="col-4 text-right">
                                        <i className="feather icon-package f-80 m-r-20"/>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Recent Users</Card.Title>


                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label> Icon Name</Form.Label>
                                    <Form.Control as="select" onChange={(e) => this.props.SelectUrl(e.target.value)}>
                                    <option>{"Select Option"}</option>
                                    <option>{"http://localhost:5000"}</option>
                                    <option>{"http://localhost:6000"}</option>
                                    <option>{"http://localhost:7000"}</option>
                                    <option>{"http://localhost:8000"}</option>
                                      
                                    </Form.Control>
                                </Form.Group>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>City</th>
                                            <th>Package</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Mark</td>
                                            <td>zinger</td>
                                            <td>abc@g.c</td>
                                            <td>Karachi</td>
                                            <td>abc</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ViewModal:true})}><i className="icon feather icon-eye text-white"/> View</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() =>   this.props.SelectUrl()}><i className="icon feather icon-check text-white" /> Accept</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-x-circle text-white"/> Reject</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Jacob</td>
                                            <td>Abad</td>
                                            <td>abc@g.c</td>
                                            <td>Lahore</td>
                                            <td>abc</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ViewModal:true})}><i className="icon feather icon-eye text-white"/> View</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12"><i className="icon feather icon-check text-white"/> Accept</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-x-circle text-white"/> Reject</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Larry</td>
                                            <td>Ortan</td>
                                            <td>abc@g.c</td>
                                            <td>Quetta</td>
                                            <td>abc</td>
                                            <td>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ViewModal:true})}><i className="icon feather icon-eye text-white"/> View</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12"><i className="icon feather icon-check text-white"/> Accept</a>
                                                <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12"><i className="icon feather icon-x-circle text-white"/> Reject</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col  md={12} lg={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Monthly Withdrawls</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-2 py-4'>
                                <Table responsive hover>
                                    <NVD3Chart tooltip={{enabled: true}} type="discreteBarChart" datum={datum} x="label" y="value" height={500} />
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>


                    <ViewModal
                        show={this.state.ViewModal}
                        onHide={() => this.setState({ViewModal:false})}
                    />
                </Row>
            </Aux>
        );
    }
}


function ViewModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-dark text-white" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Withdraw Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <h5 style={{fontWeight:'bold'}}>First Name: Syed</h5>
                  <h5 style={{fontWeight:'bold'}}>Last Name: Sherazi</h5>
              </div>
              <h5 style={{fontWeight:'bold'}}>Email: abc@g.c</h5>
              <h5 style={{fontWeight:'bold'}}>City:  Karachi</h5>
          </div>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) =>
{
  // return {

  //   myname:state.name.user,
  //   mycomment:state.Comment.comment

    
  // }
  

}

const mapDispatchToProps= (dispatch) =>{  
  return {
    SelectUrl:(url) => {dispatch(MyApiUrl(url))},
   
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);