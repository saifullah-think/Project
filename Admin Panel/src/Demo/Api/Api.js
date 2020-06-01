import React, { Component } from 'react';
import {connect} from 'react-redux'
import {MyApiUrl} from '../../store/actions';
import {Form} from 'react-bootstrap';
class Api extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
             <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Select API</Form.Label>
                                    <Form.Control as="select" onChange={(e) => this.props.SelectUrl(e.target.value)}>
                                    <option>{"Select"}</option>
                                    
                                    <option>{" https://artisanbackend.herokuapp.com"}</option>
                                    <option>{"https://secret-lake-27653.herokuapp.com "}</option>
                                    <option>{"https://polar-wildwood-42259.herokuapp.com"}</option>
                                    <option>{"https://powerful-oasis-74577.herokuapp.com"}</option>
                                      
                                    </Form.Control>
                                </Form.Group>
    );
  }
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

export default connect(mapStateToProps,mapDispatchToProps)(Api);