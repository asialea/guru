import React, { Component } from 'react';
import {connect} from 'react-redux';
import {auth} from "../../actions";
import Navbar from './Navbar';
import Settings from '../forms/Settings';

class UserSettings extends Component {

  state = {
    user:{},
   };


  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  handleChange(param,value){
    let updatedUser = this.state.user;
    updatedUser[param]=value;
    this.setState({user:updatedUser})
  }



  render () {

  return (

    <div id="settings">
      <header>
        <Navbar history={this.props.history}/>
      </header>
      <div id="user-settings">
      <div id = "user-div">
        <Settings/>
      </div>
    </div>
    <div>{this.props.children}</div>

    </div>

      );
   }
}


const mapDispatchToProps = dispatch => {
  return {
    deleteUser: (user) => {
      return dispatch(auth.deleteUser(user));
    }
  };
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token: state.auth.token,

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
