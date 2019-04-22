import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";
import Navbar from './Navbar';
import '../static/About.css';
import {forms,buttons} from 'cirrus-ui';
import IconButton from '@material-ui/core/IconButton';
import { FaPencilAlt} from 'react-icons/fa';
import {Link} from 'react-router-dom';

class About extends Component{
  render(){
    return(
    <div id="about">
      <header>
        <Navbar/>
      </header>
      <div id="body">
        <div id="pro-pic"><p>Update Profile Pic</p></div>
        <table className="table" id="about-me">
          <caption>Personal Info<Link to=""><IconButton id="about-edit" ><FaPencilAlt/></IconButton></Link></caption>
          <thead>
          </thead>
          <tbody>
            <tr><th>Name</th><td>{this.props.user.first_name} {this.props.user.last_name}</td></tr>
            <tr><th>Username</th><td>{this.props.user.username}</td></tr>
            <tr><th>Email</th><td>{this.props.user.email}</td></tr>
            <tr><th>Birthdate</th><td>{this.props.user.birth_date}</td></tr>
            <tr><th>Github</th><td>{this.props.user.github}</td></tr>
            <tr><th>LinkedIn</th><td>{this.props.user.linkedin}</td></tr>
            <tr><th>Twitter</th><td>{this.props.user.twitter}</td></tr>
            <tr><th>Account Type</th><td>{this.props.user.type}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,

    }
}

export default connect(mapStateToProps)(About);
