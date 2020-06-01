import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";

class SignUp1 extends React.Component {




    state ={
        email:'',
        password:'',
 
    }
 
 
 
    Login = () =>
    {
        
        const {email,password} = this.state;
        console.log("email====>",email)
        console.log("pass====>",password)

        let body =
        {
            email:email,
            password:password
        } 
    
        if (email !== '' || password !== ''){
            fetch(`${this.props.Baseurl==undefined?this.props.defaulturl:this.props.Baseurl}/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Credentials":"true",
                    'Access-Control-Allow-Origin':'http://localhost:5000'
        
                },
                body:JSON.stringify(body)

            })
                .then((response) => response.json())
                .then((responseData) => {
                   if(responseData)
                   {
                    localStorage.setItem('UserInfo', JSON.stringify(responseData.doc))
                    this.props.history.push('/dashboard')                    
                }
                this.setState({email:'',password:''})
                }).catch((err) => {
                    alert(err.message)
                })
        }

        else {
            alert("plaese Filled Out field")
        }
    
    
    }


    render () {

        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email" onChange={(e)=>{this.setState({email:e.target.value})}}/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="password" onChange={(e)=>{this.setState({password:e.target.value})}}/>
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                            <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                    </div>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.Login}>Login</button>
                                <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}


const mapStateToProps = (state) =>

{
  console.log("state===>",state)
  return {

    defaulturl:state.url
  }
  

}


export default connect(mapStateToProps,null)(SignUp1)