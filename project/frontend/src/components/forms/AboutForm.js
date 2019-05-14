import React, { Component } from 'react';
import {header} from 'cirrus-ui';
import {connect} from "react-redux";
import {auth} from "../../actions";
import {Link} from 'react-router-dom';
import '../static/AboutForm.css';
import {getCookie} from './get_csrf.js'

class AboutForm extends Component {
  state = {
    email:this.props.user.email,
    username: this.props.user.username,
    first_name:this.props.user.first_name,
    last_name:this.props.user.last_name,
    password: this.props.user.password,
    confirm_pass:this.props.user.password,
    github:this.props.user.github,
    linkedin:this.props.user.linkedin,
    twitter_handle:this.props.user.twitter_handle,
  }

  aboutSubmit = e => {
    e.preventDefault();
    var csrftoken= getCookie('csrftoken');
    if(this.state.password === this.state.confirm_pass){
        this.props.updateUser(this.state.username,this.state.email,this.state.first_name,this.state.last_name,
          this.state.password,this.state.github,this.state.linkedin,this.state.twitter_handle, csrftoken)
    } else{
        alert("Password does not match")
    }

  }

  render () {

      return (
      <div>
        <form id="about-form" onSubmit={this.aboutSubmit}>
               <div className="row ">
                 <div className="col-6">
                  <input className=""  type="text" id="first_name"
                   placeholder={this.props.user.first_name}  onChange={e => this.setState({first_name: e.target.value})} />
                   <label>First Name</label>
                 </div>
                  <div className="col-6">
                  <input className="" type="text" id="last_name"
                   placeholder={this.props.user.last_name}  onChange={e => this.setState({last_name: e.target.value})} />
                  <label>Last Name</label>
                  </div>
               </div>

               <div className = "row">
                     <div className="inputdiv col-12">
                    <input className = ""  type="email" id="text"
                     placeholder={this.props.user.email}  onChange={e => this.setState({email: e.target.value})} />
                     <label>Email</label>
                     </div>

                     <div className="inputdiv col-12">
                    <input className = ""  type="text" id="username"
                     placeholder={this.props.user.username}  onChange={e => this.setState({username: e.target.value})} />
                     <label>Username</label>
                     </div>

                    <div className="inputdiv col-12">
                      <input className = ""  type="password" id="new-password"
                       placeholder=""  onChange={e => this.setState({password: e.target.value})} />
                       <label>New Password</label>
                     </div>

                     <div className="inputdiv col-12">
                      <input id="confirm_pass"  type="password"
                       placeholder="" onChange={e => this.setState({confirm_pass: e.target.value})}/>
                       <label>Confirm Password</label>
                     </div>

                     <div className="inputdiv col-12">
                    <input className = ""  type="text" id="github"
                     placeholder={this.props.user.github} onChange={e => this.setState({github: e.target.value})} />
                     <label>Github URL</label>
                     </div>

                     <div className="inputdiv col-12">
                      <input className = ""  type="text" id="linkedin"
                       placeholder={this.props.user.linkedin} onChange={e => this.setState({linkedin: e.target.value})} />
                      <label>LinkedIn URL</label>
                     </div>

                     <div className="inputdiv col-12">
                      <input className = ""  type="text" id="twitter"
                       placeholder={this.props.user.twitter_handle}  onChange={e => this.setState({twitter_handle: e.target.value})} />
                       <label>Twitter URL</label>
                     </div>


                    <div className="inputdiv col-12">
                    <button className = "submit" >Update</button>
                    </div>
               </div>
               {this.props.errors.length > 0 && (
                 <ul>
                   {this.props.errors.map(error => (
                     <li key={error.field}>{error.message}</li>
                   ))}
                 </ul>
               )}
        </form>
      </div>
      );
   }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  };
}


const mapDispatchToProps = dispatch => {
  return {
    updateUser: (username,email,first_name,last_name,password,github,linkedin,twitter_handle,csrftoken) => dispatch(auth.updateUser(username,email,first_name,last_name,password,github,linkedin,twitter_handle,csrftoken)),
    login: (username, password) =>dispatch(auth.login(username, password)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AboutForm);
