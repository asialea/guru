import React, { Component } from 'react';
import {header} from 'cirrus-ui';
import {connect} from "react-redux";
import {auth} from "../../actions";
import {Link} from 'react-router-dom';
import '../static/AboutForm.css';

class AboutForm extends Component {

  state = {
    email:this.props.email,
    username: this.props.user.username,
    first_name:this.props.user.first_name,
    last_name:this.props.user.last_name,
    password: this.props.user.password,
    birth_date:this.props.user.birth_date,
    github:this.props.user.github,
    linkedin:this.props.user.linkedin,
    twitter_handle:this.props.user.twitter,
    type:this.props.user.type,
  }

  aboutSubmit = e => {
    e.preventDefault();

  }


  render () {
      return (
      <div>
        <form id="about-form" onSubmit={this.aboutSubmit}>

               <div className="row ">
                 <div className="col-6">
                  <input className=""  type="text" id="first_name"
                   placeholder={this.props.user.first_name} onChange={e => this.setState({first_name: e.target.value})} required />
                   <label>First Name</label>
                 </div>
                  <div className="col-6">
                  <input className="" type="text" id="last_name"
                   placeholder={this.props.user.last_name} onChange={e => this.setState({last_name: e.target.value})} />
                  <label>Last Name</label>
                  </div>
               </div>

               <div className = "row">
                     <div className="inputdiv col-12">
                    <input className = ""  type="email" id="text"
                     placeholder={this.props.user.email} onChange={e => this.setState({email: e.target.value})} />
                     <label>Email</label>
                     </div>

                     <div className="inputdiv col-12">
                    <input className = ""  type="text" id="username"
                     placeholder={this.props.user.username} onChange={e => this.setState({username: e.target.value})} />
                     <label>Username</label>
                     </div>

                    <div className="inputdiv col-12">
                      <input className = ""  type="password" id="new-password"
                       placeholder={this.props.user.password} onChange={e => this.setState({password: e.target.value})} />
                       <label>New Password</label>
                     </div>

                     <div className="inputdiv col-12">
                      <input id="confirm_pass"  type="password"
                       placeholder="" />
                       <label>Confirm Password</label>
                     </div>

                     <div className="inputdiv col-12">
                      <input className = ""  type="date" min="1900-01-01" id="birth_date"
                       placeholder={this.props.user.birth_date} onChange={e => this.setState({birth_date: e.target.value})} />
                       <label>Birthday</label>
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
                       placeholder={this.props.user.twitter_handle} onChange={e => this.setState({twitter_handle: e.target.value})} />
                       <label>Twitter URL</label>
                     </div>

                    <div className="inputdiv col-12">
                       <select className="" placeholder={this.props.user.type}  onChange={e => this.setState({type: e.target.value})}>
                         <option value="ME">Mentee</option>
                         <option value="MR">Mentor</option>
                       </select>
                    </div>


                    <div className="inputdiv col-12">
                    <button className = "submit" >Update</button>
                    </div>
               </div>
        </form>
      </div>
      );
   }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    aboutForm: (username,first_name,last_name,password,type) => dispatch(auth.aboutForm(username,first_name,last_name,password,type)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AboutForm);
