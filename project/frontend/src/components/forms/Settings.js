import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";
import '../static/Home.css';
import Popup from './Popup';
import {headers} from './global.js'


class UserSettings extends Component {

  state = {
    user:{},
    showPopup: false,
   };

   updateSubmit = e => {
     e.preventDefault();
     let new_pass = document.getElementById("pass").value;
     if(new_pass !== ""){
        if(new_pass === document.getElementById("confirm_pass").value){
          this.handleChange("password",new_pass);
        } else{
          alert("Passwords do not match")
        }
     }
      this.props.updateUser(this.state.user,headers['X-CSRFToken']);
   }

  togglePopup= e => {
    e.preventDefault();
    this.setState({
     showPopup: !this.state.showPopup
    });
  }

  deleteUser = (e) =>{
    this.props.deleteUser();
  }

  handleChange(param,value){
    let updatedUser = this.state.user;
    updatedUser[param]=value;
    this.setState({user:updatedUser})
  }

  render () {
    console.log(this.props)
      return (
    <div className="form-container">
      <p id = "banner">Account Settings</p>
      <form>
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
            <select defaultValue={this.props.user.type} className="" placeholder="Account Type"  onChange={e => this.handleChange("type",e.target.value)}>
              <option value="ME">Mentee</option>
              <option value="MR">Mentor</option>
            </select>
          </div>

          <div className="inputdiv col-12">
            <input id="pass" type="password" placeholder="Password" maxLength="128"/>
          </div>

          <div className="inputdiv col-12">
            <input id="confirm_pass"  type="password" placeholder="Confirm Password"/>
          </div>
        </div>
      </form>

      <button onClick={this.updateSubmit} className ="submit">Save</button>

      <button id="delete-user" className="submit" onClick={this.togglePopup.bind(this)}>Delete Account</button>

      {this.state.showPopup ?
      <Popup  action_text="Delete Account" doSomething={this.deleteUser}
                text='Are you sure you want to delete your account?'
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
    deleteUser: () => {
      return dispatch(auth.deleteUser());
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

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
