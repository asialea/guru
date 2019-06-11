import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";
import '../static/Home.css';
import Popup from './Popup';
import {headers} from './global.js'


class Settings extends Component {

  state = {
    user:{},
    showPopup: false,
   };

   updateSubmit = e => {
     e.preventDefault();
      this.props.updateUser(this.state.user,headers['X-CSRFToken']);

   }

  togglePopup= e => {
    e.preventDefault();
    this.setState({
     showPopup: !this.state.showPopup
    });
  }

  handleChange(param,value){
    let updatedUser = this.state.user;
    updatedUser[param]=value;
    this.setState({user:updatedUser})
  }

  render () {
      return (
    <div className="form-container">
      <p id = "banner"> Account Settings </p>
      <form onSubmit={this.updateSubmit}>
      <div className="row ">
        <div className="col-6">
          <input defaultValue={this.props.user.first_name}  type="text" placeholder="First Name" maxLength="30" pattern="^[a-zA-Z]+$"
          onChange={e => this.handleChange("first_name", e.target.value)} />
        </div>
        <div className="col-6">
          <input defaultValue={this.props.user.last_name} type="text" placeholder="Last Name" maxLength="150" pattern="^[a-zA-Z]+$"
          onChange={e => this.handleChange("last_name", e.target.value)}/>
        </div>
      </div>

      <div className = "row">
        <div className="inputdiv col-12">
          <input defaultValue={this.props.user.username}  type="text" placeholder="Username" maxLength="30" pattern="^[a-zA-Z0-9]+$"
          onChange={e => this.handleChange("username", e.target.value)}/>
        </div>

        <div className="inputdiv col-12">
          <input defaultValue={this.props.user.email}  type="email" placeholder="Email"  maxLength="254"
          onChange={e => this.handleChange("email", e.target.value)}/>
        </div>

        <div className="inputdiv col-12">
          <input type="password" placeholder="Password" maxLength="128"
          onChange={e => this.handleChange("password", e.target.value)}/>
        </div>

        <div className="inputdiv col-12">
          <input id="confirm_pass"  type="password" placeholder="Confirm Password"/>
        </div>


        <div className="inputdiv col-12">
          <select defaultValue={this.props.user.type} className="" placeholder="Account Type"  onChange={e => this.handleChange("type",e.target.value)}>
            <option value="ME">Mentee</option>
            <option value="MR">Mentor</option>
          </select>
        </div>
      </div>

         <button className ="submit">Save</button>
      </form>
      <button id="delete-user" className="submit" onClick={this.togglePopup.bind(this)}>Delete Account</button>
      {this.state.showPopup ?
      <Popup
                text='Click "Close Button" to hide popup'
                closePopup={this.togglePopup.bind(this)}
      />
      : null
      }

      </div>

      );
   }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: (user) => {
      return dispatch(auth.deleteUser(user));
    },
    updateUser: (user,csrftoken) => {
      return dispatch(auth.updateUser(user,csrftoken));
    }
  };
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token: state.auth.token,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
