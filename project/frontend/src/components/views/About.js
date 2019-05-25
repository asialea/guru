import React, { Component } from 'react';
import {connect} from "react-redux";
import {aboutUser} from "../../actions";
import Navbar from './Navbar';
import '../static/About.css';
import {FaPlus} from 'react-icons/fa';
import Skills from '../forms/Skills'
import Interests from '../forms/Interests'
import Experience from '../forms/Experience'
import Education from '../forms/Education'
import AboutUser from '../forms/AboutUser'

class About extends Component{

  state ={
    avi:"",
    education:[],
    skills:[],
    interests:[],
    hidden:true,
  }

  componentWillMount(){
    fetch(`/api/avi/${this.props.aboutUser.user_id}/`)
      .then(response => { return response.json();}).then(responseData => {return responseData;})
     .then (json =>this.setState({avi: json})).catch(err => {
           console.log("fetch error" + err);
       });
                      }
  show = (e) =>{
    this.setState({hidden:!this.state.hidden})
  }

  render(){
    var proPic = {  backgroundImage:'url(' + this.state.avi.avi_path + ')'};
    return(
    <div className="body">
      <header>
        <Navbar/>
      </header>
      <div className="flex-box">
        <div className="about-body">
          <section id="aboutUser">
            <div className="flex-box">
              <div id="pro-pic" style={proPic}></div>
            </div>
            <button onClick={this.show} className="table accordion btn-animated"><h2>About<FaPlus onClick={this.show} className="about-expand"/></h2></button>
            <div className={this.state.hidden ? 'hidden':'form'}>
             <AboutUser/>
            </div>
            <div>
            <article id="bio">
              <p className="desc res-item">{this.props.aboutUser && this.props.aboutUser.bio}</p>
            </article>
              <table className="table" id="about-me">
                <thead>
                </thead>
                <tbody>
                  <tr><th>Name</th><td>{this.props.user.first_name} {this.props.user.last_name}</td></tr>
                  <tr><th>Location</th><td>{this.props.aboutUser.location}</td></tr>
                  <tr><th>Email</th><td>{this.props.user.email}</td></tr>
                  <tr><th>Github</th><td>{this.props.aboutUser.github}</td></tr>
                  <tr><th>LinkedIn</th><td>{this.props.aboutUser.linkedin}</td></tr>
                  <tr><th>Twitter</th><td>{this.props.aboutUser.twitter_handle}</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          <section id="resume">
            <article>
              <Experience/>
            </article>

            <article>
                <Education/>
            </article>

            <article>
                <Skills/>
            </article>

            <article>
              <Interests/>
            </article>
          </section>
        </div>
      </div>
      <div>{this.props.children}</div>
    </div>
    );
  }
}
const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token: state.auth.token,
        aboutUser: state.aboutUser.user,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAboutUser: () => dispatch(aboutUser.fetchAboutUser()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(About);
