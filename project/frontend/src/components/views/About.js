import React, { Component } from 'react';
import {connect} from "react-redux";
import Navbar from './Navbar';
import '../static/About.css';
import Skills from '../forms/Skills'
import Interests from '../forms/Interests'
import Experience from '../forms/Experience'
import Education from '../forms/Education'
import AboutUser from '../forms/AboutUser'
import {FaUser,FaMapMarker,FaEdit} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';


class About extends Component{

  state = {
    aboutUser:{},
    hidden:true,

  }

  parse_type(type){
    return (type ==='MR' ? 'Mentor' : 'Mentee')
  }

  show = (e) =>{
    this.setState({hidden:!this.state.hidden});
  }


  fetchAboutUser = ()=>{
    fetch(`/api/aboutUser/${this.props.user.username}/`)
      .then(response => { return response.json();}).then(json =>this.setState({aboutUser: json}))
      .then(this.setState({hidden:true}))
      .catch(err => {console.log("fetch error" + err);})
  }

  componentWillMount(){
      this.fetchAboutUser();
    }

  render(){
    return(
    <div className="body" id="about">
      <header>
        <Navbar history={this.props.history}/>
      </header>
      <div className="flex-box">
      <div className="about-header"></div>
        <div className="about-body">

          <section id="bio-contact">
            <AboutUser hidden={this.state.hidden} fetchAboutUser={this.fetchAboutUser} aboutUser={this.state.aboutUser}/>
            <article>
              <Skills/>
            </article>
            <article>
              <Interests/>
            </article>
          </section>

          <section id="about-user">
            <span><h1 id="name">{this.props.user.first_name} {this.props.user.last_name} </h1>
            ({this.parse_type(this.props.user.type)})
               <IconButton onClick={this.show}><FaEdit  className="about-expand"/></IconButton>
            </span>
            <p><FaUser/> @{this.props.user.username}</p>
            <p><FaMapMarker/> {this.state.aboutUser.location}</p>
          </section>

          <section id="resume">
            <article>
              <Experience/>
            </article>

            <article>
              <Education/>
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
    }
}



export default connect(mapStateToProps)(About);
