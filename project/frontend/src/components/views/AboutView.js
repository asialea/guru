import React, { Component } from 'react';
import {readUser} from "../../actions";
import Navbar from './Navbar';
import '../static/About.css';


class AboutView extends Component{
  constructor() {
    super()
    this.state = {
      user:{},
      aboutUser:{},
      work:[],
      education:[],
      skills:[],
      interests:[]
    }
  }

componentDidMount(){
 fetch(`/api/user/${this.props.match.params.username}/`)
   .then(response => { return response.json();}).then(responseData => {return responseData;})
  .then (json =>this.setState({user: json})).catch(err => {
        console.log("fetch error" + err);
    });

  }

  render(){
    return(
      <div>
      <header>
        <Navbar/>
      </header>
      <div className="flex-box">
        <div id="body">
          <div id="pro-pic"><p>Update Profile Pic</p></div>
            <table className="table" id="about-me">
              <thead>
              </thead>
              <tbody>
                <tr><th>Name</th><td>{this.state.user.first_name} {this.state.user.last_name}</td></tr>
                <tr><th>Username</th><td>{this.state.user.username}</td></tr>
                <tr><th>Email</th><td>{this.state.user.email}</td></tr>
                <tr><th>Github</th><td>{this.state.user.github}</td></tr>
                <tr><th>LinkedIn</th><td>{this.state.user.linkedin}</td></tr>
                <tr><th>Twitter</th><td>{this.state.user.twitter_handle}</td></tr>
                <tr><th>Account Type</th><td>{this.state.user.type}</td></tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>
    );
  }
}

export default (AboutView);
