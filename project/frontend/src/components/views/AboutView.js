import React, { Component } from 'react';
import Navbar from './Navbar';
import '../static/About.css';
import {FaGithub,FaLinkedin,FaTwitter} from 'react-icons/fa';


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
      avi:{}
    }
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
  }

  parse_type(type){
    return (type ==='MR' ? 'Mentor' : 'Mentee')
  }

  render(){
    var proPic = {  backgroundImage:'url(' + this.state.user.avi__avi_path + ')'};
    return(
    <div className="body">
      <header>
        <Navbar/>
      </header>
      <div className="flex-box">
        <div className="about-body">
          <section id="aboutUser">
            <div className="flex-box">
              <div id="pro-pic-user"  style={proPic}></div>
            </div>
            <div className="table accordion btn-animated"><h2>About</h2></div>
            <div>
            <article id="bio">
              <p className="desc res-item">{this.state.aboutUser.bio}</p>
            </article>
              <table className="table" id="about-me">
                <thead>
                </thead>
                <tbody>
                  <tr><th>Name</th><td>{this.state.user.first_name} {this.state.user.last_name}</td></tr>
                  <tr><th>Location</th><td>{this.state.aboutUser.location}</td></tr>
                  <tr><th>Type</th><td>{this.parse_type(this.state.user.type)}</td></tr>
                </tbody>
              </table>
              <div  id="contact">
                <a href={this.state.aboutUser.github}><FaGithub className="social"/></a>
                <a href={this.state.aboutUser.linkedin}><FaLinkedin className="social"/></a>
                <a href={this.state.aboutUser.twitter_handle}><FaTwitter className="social"/></a>
              </div>
            </div>
          </section>
          <section id="resume">
            <article>
             <div className="accordion btn-animated"><h2>Experience</h2></div>
             <div>
             {this.state.work.map(el => {
                   return <div className="edu-ex" key={el.id}>
                        <h3 className="main res-item">{el.company}, </h3><span className="res-item">{el.location} -</span>
                        <span className="position">{el.position} </span>
                        <p className="date res-item">{el.start}-{el.end}</p>
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
                           <p className="edu res-item">{el.start}-{el.end}</p>
                      </div>
                  })}
              </div>
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
        </div>
      </div>
    </div>
    );
  }
}

export default (AboutView);
