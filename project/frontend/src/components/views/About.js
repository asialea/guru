import React, { Component } from 'react';
import {connect} from "react-redux";
import {work,education,aboutUser,skills,interests} from "../../actions";
import Navbar from './Navbar';
import '../static/About.css';
import IconButton from '@material-ui/core/IconButton';
import {FaTimes,FaPlus} from 'react-icons/fa';
import Skills from '../forms/Skills'
import Interests from '../forms/Interests'
import Experience from '../forms/Experience'
import Education from '../forms/Education'
import AboutUser from '../forms/AboutUser'
import {getCookie} from '../forms/get_csrf.js'

class About extends Component{

  state ={
    csrftoken:getCookie('csrftoken'),
  }

  componentDidMount(){
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }

  render(){
    return(
    <div className="body">
      <header>
        <Navbar/>
      </header>
      <div className="flex-box">
        <div id="body">
          <section id="aboutUser">
            <div className="flex-box">
              <div id="pro-pic"><p>Update Profile Pic</p></div>
            </div>
            <button className="table accordion btn-animated"><h2>About<FaPlus className="about-expand"/></h2></button>
            <div className="form">
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
             <button className="accordion btn-animated"><h2>Experience<FaPlus className="expand"/></h2></button>
             <div className="form">
              <Experience/>
             </div>
             <div>
             {this.props.work.map(el => {
                   return <div key={el.id}>
                        <h3 className="main res-item">{el.company}, </h3><span className="res-item">{el.location} -</span>
                        <span className="position">{el.position} </span>
                        <IconButton className="delete" onClick={()=>this.props.deleteWork(el.id,this.state.csrftoken).then(this.props.fetchWork()).then(window.location.reload(true))} ><FaTimes/></IconButton>
                        <p className="date res-item">{el.start}-{el.end}</p>
                        <p className="desc res-item">{el.description}</p>
                   </div>
               })}
            </div>
            </article>

            <article>
              <button className="accordion btn-animated"><h2>Education<FaPlus className="expand"/></h2></button>
              <div className="form">
                <Education/>
              </div>
              <div>
                {this.props.education.map(el => {
                      return <div key={el.id}>
                           <h3 className="main res-item">{el.school}, </h3><span className="res-item">{el.location} -</span>
                           <span className="position">{el.degree} </span>
                           <IconButton className="delete" onClick={()=>this.props.deleteEducation(el.id,this.state.csrftoken).then(this.props.fetchEducation()).then(window.location.reload(true))} ><FaTimes/></IconButton>
                           <p className="date res-item">{el.start}-{el.end}</p>
                      </div>
                  })}
              </div>
            </article>

            <article>
              <button className="accordion btn-animated"><h2>Skills<FaPlus className="expand"/></h2></button>
              <div className="form">
                <Skills/>
              </div>
              <div>
              {this.props.skills.map(el => {
                    return <div className="skill" key={el.id}>
                         {el.skill} {el.level}<IconButton className="deleteSkill" onClick={()=>this.props.deleteSkill(el.id,this.state.csrftoken).then(this.props.fetchSkills()).then(window.location.reload(true))} ><FaTimes/></IconButton>

                    </div>
                })}
              </div>
            </article>

            <article>
              <button className="accordion btn-animated"><h2>Interests<FaPlus className="expand"/></h2></button>
              <div className="form">
                <Interests/>
              </div>
              <div>
              {this.props.interests.map(el => {
                    return <div className="skill" key={el.id}>
                         {el.interest}<IconButton className="deleteSkill" onClick={()=>this.props.deleteInterest(el.id,this.state.csrftoken).then(this.props.fetchInterests()).then(window.location.reload(true))} ><FaTimes/></IconButton>

                    </div>
                })}
              </div>
            </article>
          </section>
        </div>
      </div>
      <div>{this.props.children}</div>
    </div>
    );
  }
}
// do this so we can have access to the global state from the store in our component,
const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token: state.auth.token,
        work:state.work,
        education:state.education,
        aboutUser:state.aboutUser.user,
        skills:state.skills,
        interests:state.interests
    }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchWork: () => dispatch(work.fetchWork()),
    deleteWork: (id) => dispatch(work.deleteWork(id)),
    fetchEducation: () => dispatch(education.fetchEducation()),
    deleteEducation: (id) => dispatch(education.deleteEducation(id)),
    fetchAboutUser: () => dispatch(aboutUser.fetchAboutUser()),
    fetchSkills: () => dispatch(skills.fetchSkills()),
    deleteSkill: (id) => dispatch(skills.deleteSkill(id)),
    fetchInterests: () => dispatch(interests.fetchInterests()),
    deleteInterest: (id) => dispatch(interests.deleteInterest(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(About);
