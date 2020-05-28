import React, { Component } from 'react';
import {Dropdown,Badge} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ChatList from './ChatList';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';

class NavRight extends Component {
    state = {
        listOpen: false
    };

    render() {

        console.log(this.props)
        return (
            <Aux>
                <ul className="navbar-nav ml-auto">
                    <li className={this.props.rtlLayout ? 'm-r-15' : 'm-l-15'}>
                        <a href={DEMO.BLANK_LINK} className="displayChatbox" style={{position:'relative'}} onClick={() => {this.setState({listOpen: true});}}><i style={{fontSize:20}} className="icon feather icon-mail"/>{' '}<Badge style={{position:'absolute',top:-10,left:15,fontSize:10}} pill variant="info">9</Badge></a>
                    </li>
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i style={{fontSize:20}} className="icon feather icon-settings"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar1} className="img-radius" alt="User Profile"/>
                                    <span>John Doe</span>
                                    <a href={DEMO.BLANK_LINK} className="dud-logout" title="Logout">
                                        <i className="feather icon-log-out"/>
                                    </a>
                                </div>
                                <ul className="pro-body">
                                    <li><Link to="/profile-setting" className="dropdown-item"><i className="feather icon-settings"/>Profile Settings</Link></li>
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
                <ChatList listOpen={this.state.listOpen} closed={() => {this.setState({listOpen: false});}} />
            </Aux>
        );
    }
}

export default NavRight;
