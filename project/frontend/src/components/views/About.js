import React, { Component } from 'react';
import {connect} from "react-redux";
import Navbar from './Navbar';
import '../static/About.css';
import Skills from '../forms/Skills'
import Interests from '../forms/Interests'
import Experience from '../forms/Experience'
import Education from '../forms/Education'
import AboutUser from '../forms/AboutUser'
import {FaUser,FaMapMarker,FaEdit,FaStar,FaGithub,FaLinkedin,FaTwitter,FaPlus,FaFacebook,FaLink} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import {Tabs,TabLink,TabContent} from 'react-tabs-redux';


class About extends Component{

  state = { 
    aboutUser:{},
    form_hidden:true,
    avi:{},
    rec:[],
    avg:null,

  }

  parse_type(type){
    return (type ==='MR' ? 'Mentor' : 'Mentee')
  }

  show = () =>{
    this.setState({form_hidden:!this.state.form_hidden});
  }

  fetchAvi = ()=>{
    fetch(`/api/avi/${this.props.user.id}/`)
      .then(response => { return response.json();}).then(json =>this.setState({avi: json}))
      .catch(err => {console.log("fetch error" + err);});
            }

  fetchAboutUser = ()=>{
    fetch(`/api/aboutUser/${this.props.user.username}/`)
      .then(response => { return response.json();}).then(json =>this.setState({aboutUser: json}))
      .then(this.setState({hidden:true}))
      .catch(err => {console.log("fetch error" + err);})
  }

  fetchRec = ()=>{
    fetch(`/api/rec/${this.props.user.username}/`)
     .then(response => { return response.json();}).then(responseData => {return responseData;})
    .then (json =>{this.setState({rec: json.data});this.setState({avg: json.avg})} ).catch(err => {
          console.log("fetch error" + err);
      });
  }

  componentWillMount(){
      this.fetchAboutUser();
      this.fetchAvi();
      this.fetchRec();
    }

  render(){
    return(
    <div className="body" id="about">
      <header>
        <Navbar history={this.props.history}/>
      </header>
      <div className="flex-box">
      <div className="about-body">
        <section id="bio-section">
          <div className="square-container">
            <img id="pro-pic" alt="user avi" src={this.state.avi.avi_path}/>
          </div>
          <div id="bio-contact">
            <AboutUser show={this.show} fetchAvi={this.fetchAvi} hidden={this.state.form_hidden} fetchAboutUser={this.fetchAboutUser} aboutUser={this.state.aboutUser}/>
          </div>
        </section>

        <section id="about-user">
          <p id="name">
          {this.props.user.first_name} {this.props.user.last_name}
          <IconButton onClick={this.show}> <FaEdit  className="about-expand"/></IconButton>
          </p>
          <div id="star-rating">
              {this.state.avg ? Array(this.state.avg).fill(<FaStar className="social-icon star"/>):null}
          </div>
          <p><FaUser fill="#e27d60"/> @{this.props.user.username}   ({this.parse_type(this.props.user.type)})</p>
          <p><FaMapMarker fill="#e27d60"/> {this.state.aboutUser.location}</p>
          <p className="social">
            {this.state.aboutUser.github !== "" ? <a href={this.state.aboutUser.github}><FaGithub className="social-icon"/></a> : null}
            {this.state.aboutUser.linkedin !== "" ? <a href={this.state.aboutUser.linkedin}><FaLinkedin className="social-icon"/></a> :null}
            {this.state.aboutUser.twitter !== "" ? <a href={this.state.aboutUser.twitter}><FaTwitter className="social-icon"/></a>:null}
            {this.state.aboutUser.facebook !== "" ? <a href={this.state.aboutUser.facebook}><FaFacebook className="social-icon"/></a>:null}
            {this.state.aboutUser.personal !== "" ? <a href={this.state.aboutUser.personal}><FaLink className="social-icon"/></a>:null}

          </p>
        </section>

        <section id="resume">
          <Tabs>
          <div id="tablinks">
            <TabLink className='tablink contact-tab' to="tab5">About</TabLink>
            <TabLink className='tablink' to="tab1" default>Experience</TabLink>
            <TabLink className='tablink' to="tab2">Education</TabLink>
            <TabLink className='tablink' to="tab3">Skills </TabLink>
            <TabLink className='tablink' to="tab4">Interests</TabLink>
          </div>

          <TabContent className="" for="tab5">
            <button onClick={this.show} className="accordion btn-animated"><FaPlus onClick={this.show} className="expand"/></button>
            <AboutUser show={this.show} fetchAvi={this.fetchAvi} hidden={this.state.form_hidden} fetchAboutUser={this.fetchAboutUser}
             aboutUser={this.state.aboutUser}/>
          </TabContent>

            <TabContent  for="tab1">
              <Experience/>
            </TabContent>

            <TabContent  for="tab2">
              <Education/>
            </TabContent>

            <TabContent  for="tab3">
              <Skills/>
            </TabContent>

            <TabContent  for="tab4">
              <Interests/>
            </TabContent>

          </Tabs>
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
    }
}



export default connect(mapStateToProps)(About);
