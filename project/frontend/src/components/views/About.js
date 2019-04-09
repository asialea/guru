import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";
import Navbar from './Navbar';
import '../static/About.css';
import {forms,buttons} from 'cirrus-ui';
import IconButton from '@material-ui/core/IconButton';
import { FaPencilAlt} from 'react-icons/fa';


class About extends Component{

  render(){

    return(
    <div id="about">
      <header>
        <Navbar/>
      </header>
      <div id="body">
        <div id="pro-pic"><p>Update Profile Pic</p></div>
          <table class="table" id="about-me">
            <thead>
            </thead>
            <tbody>
              <tr><th>Name</th><td>{this.props.user.first_name} {this.props.user.last_name}</td><IconButton><FaPencilAlt/></IconButton></tr>
              <tr><th>Email</th><td>{this.props.user.username}</td><IconButton><FaPencilAlt/></IconButton></tr>
              <tr><th>Birthdate</th><td>{this.props.user.birth_date}</td><IconButton><FaPencilAlt/></IconButton></tr>
              <tr><th>Github</th><td>{this.props.user.github}</td><IconButton><FaPencilAlt/></IconButton></tr>
              <tr><th>LinkedIn</th><td>{this.props.user.linkedin}</td><IconButton><FaPencilAlt/></IconButton></tr>
              <tr><th>Twitter</th><td>{this.props.user.twitter}</td><IconButton><FaPencilAlt/></IconButton></tr>
              <tr><th>User</th><td>{this.props.user.type}</td><IconButton><FaPencilAlt/></IconButton></tr>
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
