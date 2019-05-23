import React, { Component } from 'react';
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
      interests:[],
      avi:{}
    }
  }

componentWillMount(){


 fetch(`/api/user/${this.props.match.params.username}/`)
   .then(response => { return response.json();}).then(responseData => {return responseData;})
  .then (json =>{this.setState({user: json});return json;}).then(user=> fetch(`/api/avi/${user.id}/`)
      .then(response => { return response.json();}).then(responseData => {return responseData;})
     .then(json =>this.setState({avi: json})).catch(err => {
           console.log("fetch error" + err);
       })).catch(err => {
        console.log("fetch error" + err);
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
              <div id="pro-pic-user"  style={proPic}></div>
            </div>
            <button className="table accordion btn-animated"><h2>About</h2></button>
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
                  <tr><th>Email</th><td>{this.state.user.email}</td></tr>
                  <tr><th>Github</th><td>{this.state.aboutUser.github}</td></tr>
                  <tr><th>LinkedIn</th><td>{this.state.aboutUser.linkedin}</td></tr>
                  <tr><th>Twitter</th><td>{this.state.aboutUser.twitter_handle}</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          <section id="resume">
            <article>
             <button className="accordion btn-animated"><h2>Experience</h2></button>
             <div>
             {this.state.work.map(el => {
                   return <div key={el.id}>
                        <h3 className="main res-item">{el.company}, </h3><span className="res-item">{el.location} -</span>
                        <span className="position">{el.position} </span>
                        <p className="date res-item">{el.start}-{el.end}</p>
                        <p className="desc res-item">{el.description}</p>
                   </div>
               })}
            </div>
            </article>

            <article>
              <button className="accordion btn-animated"><h2>Education</h2></button>
              <div>
                {this.state.education.map(el => {
                      return <div key={el.id}>
                           <h3 className="main res-item">{el.school}, </h3><span className="res-item">{el.location} -</span>
                           <span className="position">{el.degree} </span>
                           <p className="date res-item">{el.start}-{el.end}</p>
                      </div>
                  })}
              </div>
            </article>

            <article>
              <button className="accordion btn-animated"><h2>Skills</h2></button>
              <div>
              {this.state.skills.map(el => {
                    return <div className="skill" key={el.id}>
                         {el.skill} {el.level}

                    </div>
                })}
              </div>
            </article>

            <article>
              <button className="accordion btn-animated"><h2>Interests</h2></button>
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
