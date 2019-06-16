import React, { Component } from 'react';
import Navbar from './Navbar';
import '../static/About.css';
import {FaGithub,FaLinkedin,FaTwitter,FaEnvelope,FaUser,FaMapMarker} from 'react-icons/fa';
import ReccPopup from '../forms/ReccPopup';
import {Link} from 'react-router-dom';


class AboutView extends Component{
  constructor() {
    super()
    this.state = {
      user:{},
      aboutUser:{},
      work:[],
      education:[],
      skills:[],
      interests:[],
      rec:[],
      avi:{},
      showPopup: false,
    }
  }

  fetchRec = ()=>{
    fetch(`/api/rec/${this.props.match.params.username}/`)
     .then(response => { return response.json();}).then(responseData => {return responseData;})
    .then (json =>this.setState({rec: json})).catch(err => {
          console.log("fetch error" + err);
      });
  }

componentWillMount(){
 fetch(`/api/user/${this.props.match.params.username}/`)
  .then(response => { return response.json();}).then(responseData => {return responseData;})
  .then (json =>{this.setState({user: json[0]});})
  .catch(err => {console.log("fetch error" + err);
    });

  fetch(`/api/aboutUser/${this.props.match.params.username}/`)
    .then(response => { return response.json();}).then(responseData => {return responseData; })
   .then (json =>this.setState({aboutUser: json})).catch(err => {
         console.log("fetch error" + err);
     })

 fetch(`/api/user-work/${this.props.match.params.username}/`)
   .then(response => { return response.json();}).then(responseData => {return responseData; })
  .then (json =>this.setState({work: json})).catch(err => {
        console.log("fetch error" + err);
    });

  fetch(`/api/user-edu/${this.props.match.params.username}/`)
    .then(response => { return response.json();}).then(responseData => {return responseData;})
   .then (json =>this.setState({education: json})).catch(err => {
         console.log("fetch error" + err);
     });

  fetch(`/api/user-skills/${this.props.match.params.username}/`)
   .then(response => { return response.json();}).then(responseData => {return responseData;})
  .then (json =>this.setState({skills: json})).catch(err => {
        console.log("fetch error" + err);
    });

  fetch(`/api/user-interests/${this.props.match.params.username}/`)
   .then(response => { return response.json();}).then(responseData => {return responseData;})
  .then (json =>this.setState({interests: json})).catch(err => {
        console.log("fetch error" + err);
    });

  this.fetchRec()

  }

  parseDate(timestamp){
    if(timestamp){
    var t = timestamp.split(/[-:T]/)
    var d = new Date(Date.UTC(t[0],t[1],t[2]));
    return d.toString().slice(4,15)
    }
  }

  parse_type(type){
    return (type ==='MR' ? 'Mentor' : 'Mentee')
  }

  togglePopup= e => {
    e.preventDefault();
    this.setState({
     showPopup: !this.state.showPopup
    });
  }

  render(){
    return(
    <div className="body">
      <header>
        <Navbar history={this.props.history}/>
      </header>

      <div className="flex-box">
      <div className="about-header"></div>
      <div className="about-body">
      <img id="pro-pic" alt="user avi" src={this.state.user.avi__avi_path}/>

      <section id="about-user">
        <span><h1 id="name">{this.state.user.first_name} {this.state.user.last_name}</h1>
        ({this.parse_type(this.state.user.type)})
        </span>

        <button id="recommend" onClick={this.togglePopup} className="submit">Write a Reccomendation</button>
        {this.state.showPopup ?
          <ReccPopup fetch={this.fetchRec} username={this.props.match.params.username} user_id={this.state.user.id} text={"Tell us about "+this.state.user.first_name} closePopup={this.togglePopup.bind(this)}/>
        : null
        }

        <p><FaUser/> @{this.state.user.username}</p>
        <p><FaMapMarker/> {this.state.aboutUser.location}</p>
      </section>
        <section id="bio-contact">

          <span className="social">
            <a href={this.state.aboutUser.github}><FaGithub className="social-icon"/></a>
            <a href={this.state.aboutUser.linkedin}><FaLinkedin className="social-icon"/></a>
            <a href={this.state.aboutUser.twitter_handle}><FaTwitter className="social-icon"/></a>
            <a href={this.state.user.email}><FaEnvelope className="social-icon"/></a>
          </span>

          <article id="bio">
            <p className="desc res-item">{this.state.aboutUser.bio}</p>
          </article>

          <article>
            <div className="accordion btn-animated"><h2>Skills</h2></div>
            <div>
            {this.state.skills.map(el => {
                  return <div className="skill" key={el.id}>
                       {el.skill} {el.level}

                  </div>
              })}
            </div>
          </article>

          <article>
            <div className="accordion btn-animated"><h2>Interests</h2></div>
            <div>
            {this.state.interests.map(el => {
                  return <div className="skill" key={el.id}>
                       {el.interest}
                  </div>
              })}
            </div>
          </article>
        </section>

        <section id="resume">
          <article>
           <div className="accordion btn-animated"><h2>Experience</h2></div>
           <div>
           {this.state.work.map(el => {
                 return <div className="edu-ex" key={el.id}>
                      <h3 className="main res-item">{el.company}, </h3><span className="res-item">{el.location} -</span>
                      <span className="position">{el.position} </span>
                      <p className="date res-item">{this.parseDate(el.start)} - {this.parseDate(el.end)}</p>
                      <p className="desc res-item">{el.description}</p>
                 </div>
             })}
          </div>
          </article>

          <article>
            <div className="accordion btn-animated"><h2>Education</h2></div>
            <div>
              {this.state.education.map(el => {
                    return <div className="edu-ex" key={el.id}>
                         <h3 className="main res-item">{el.school}, </h3><span className="res-item">{el.location} -</span>
                         <span className="position">{el.degree} </span>
                         <p className="edu res-item">{this.parseDate(el.start)} - {this.parseDate(el.end)}</p>
                    </div>
                })}
            </div>
          </article>

          <article>
            {this.state.rec.length > 0 ? <div className="accordion btn-animated"><h2>Reccomendations</h2></div> : null}
            <div>
              {this.state.rec.map((el,idx) =>{
                    return <div className="edu-ex" key={idx}>
                         <p className="desc res-item">"{el.text}" - <Link to={`/about/${el.author__username}`}>@{el.author__username}</Link></p>
                    </div>
                })}
            </div>
          </article>
        </section>
        </div>
      </div>
    </div>
    );
  }
}

export default (AboutView);
