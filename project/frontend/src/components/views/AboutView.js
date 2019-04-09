import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";
import Navbar from './Navbar';
import '../static/About.css';
import {forms,buttons} from 'cirrus-ui';


class AboutView extends Component{

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
              <tr><th>Name</th><td></td></tr>
              <tr><th>Email</th><td></td></tr>
              <tr><th>Birthdate</th><td></td></tr>
              <tr><th>Github</th><td></td></tr>
              <tr><th>LinkedIn</th><td></td></tr>
              <tr><th>Twitter</th><td></td></tr>
              <tr><th>User</th><td></td></tr>
            </tbody>
          </table>
      </div>
    </div>
    );
  }
}


export default AboutView;
