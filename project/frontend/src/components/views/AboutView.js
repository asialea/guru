import React, { Component } from 'react';
import Navbar from './Navbar';
import '../static/About.css';
import {FaGithub,FaLinkedin,FaTwitter,FaEnvelope,FaUser,FaMapMarker,FaStar,FaTimes} from 'react-icons/fa';
import ReccPopup from '../forms/ReccPopup';
import {Link} from 'react-router-dom';
import {Tabs,TabLink,TabContent} from 'react-tabs-redux';
import IconButton from '@material-ui/core/IconButton';
import {connect} from "react-redux";
import {headers} from '../forms/global.js'


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
      avg:null,
    }
  }

  fetchRec = ()=>{
    fetch(`/api/rec/${this.props.match.params.username}/`)
     .then(response => { return response.json();}).then(responseData => {return responseData;})
    .then (json =>{this.setState({rec: json.data});this.setState({avg: json.avg})} ).catch(err => {
          console.log("fetch error" + err);
      });
  }

deleteReview(id){
  let body = JSON.stringify({id});
  headers["Authorization"] = `Token ${this.props.token}`;
  fetch(`/api/rec/${this.props.match.params.username}/`, {headers,body,method:"DELETE"})
  .then(res => {return res.json();}).then(()=>this.fetchRec())
  .catch(err => {console.log("fetch error" + err)})
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

 fetch(`/api/work/${this.props.match.params.username}/`)
   .then(response => { return response.json();}).then(responseData => {return responseData; })
  .then (json =>this.setState({work: json})).catch(err => {
        console.log("fetch error" + err);
    });

  fetch(`/api/edu/${this.props.match.params.username}/`)
    .then(response => { return response.json();}).then(responseData => {return responseData;})
   .then (json =>this.setState({education: json})).catch(err => {
         console.log("fetch error" + err);
     });

  fetch(`/api/skills/${this.props.match.params.username}/`)
   .then(response => { return response.json();}).then(responseData => {return responseData;})
  .then (json =>this.setState({skills: json})).catch(err => {
        console.log("fetch error" + err);
    });

  fetch(`/api/interests/${this.props.match.params.username}/`)
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
    console.log(this.state.rec);
    return(
    <div className="body" id="about">
      <header>
        <Navbar history={this.props.history}/>
      </header>

      <div className="flex-box">
      <div className="about-header"></div>
      <div className="about-body">

      <section id="bio-section">
        <div className="square-container">
          <img id="pro-pic" alt="user avi" src={this.state.user.avi__avi_path}/>
        </div>
        <div id="bio-contact">
          <span className="social">
            <a href={this.state.aboutUser.github}><FaGithub className="social-icon"/></a>
            <a href={this.state.aboutUser.linkedin}><FaLinkedin className="social-icon"/></a>
            <a href={this.state.aboutUser.twitter_handle}><FaTwitter className="social-icon"/></a>
            <a href={this.state.user.email}><FaEnvelope className="social-icon"/></a>
          </span>

          <article id="bio">
            <p className="desc res-item">{this.state.aboutUser.bio}</p>
          </article>
        </div>
      </section>

      <section id="about-user">
        <p id="name">
          {this.state.user.first_name} {this.state.user.last_name}
        </p>

        <button id="recommend" onClick={this.togglePopup} className="submit">Write a Review</button>
        {this.state.showPopup ?
          <ReccPopup fetch={this.fetchRec} username={this.props.match.params.username} user_id={this.state.user.id} text={"Tell us about "+this.state.user.first_name} closePopup={this.togglePopup.bind(this)}/>
        : null
        }
        <p><FaUser/> @{this.state.user.username} ({this.parse_type(this.state.user.type)})</p>
        {this.state.location ? <p><FaMapMarker/> {this.state.aboutUser.location}</p> : null}
        <p>
            {this.state.avg ? Array(this.state.avg).fill(<FaStar className="social-icon"/>):null}
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
          <TabLink className='tablink' to="tab6">Reviews</TabLink>

        </div>

        <TabContent className='contact-tab' for="tab5">
          <span className="social">
            <a href={this.state.aboutUser.github}><FaGithub className="social-icon"/></a>
            <a href={this.state.aboutUser.linkedin}><FaLinkedin className="social-icon"/></a>
            <a href={this.state.aboutUser.twitter_handle}><FaTwitter className="social-icon"/></a>
            <a href={this.state.user.email}><FaEnvelope className="social-icon"/></a>
          </span>

          <article id="bio">
            <p className="desc res-item">{this.state.aboutUser.bio}</p>
          </article>
        </TabContent>

        <TabContent for="tab1">

            <article>
            {this.state.work.length > 0 ?
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
               :<p> No items </p>}

            </article>

        </TabContent>

          <TabContent for="tab2">
          <article>
          {this.state.work.educaion > 0 ?
            <div>
              {this.state.education.map(el => {
                    return <div className="edu-ex" key={el.id}>
                         <h3 className="main res-item">{el.school}, </h3><span className="res-item">{el.location} -</span>
                         <span className="position">{el.degree} </span>
                         <p className="edu res-item">{this.parseDate(el.start)} - {this.parseDate(el.end)}</p>
                    </div>
                })}
            </div>
            : <p>No items </p>}
          </article>

          </TabContent>

          <TabContent for="tab3">
          <article>
          <article>
          {this.state.skills.length > 0 ?
            <div>
            {this.state.skills.map(el => {
                  return <div className="skill" key={el.id}>
                       {el.skill} {el.level}

                  </div>
              })}
            </div>
            : <p>No items</p>}
          </article>

          </article>
          </TabContent>

          <TabContent for="tab4">
          <article>
          {this.state.interests.length > 0 ?
            <div>
            {this.state.interests.map(el => {
                  return <div className="skill" key={el.id}>
                       {el.interest}
                  </div>
              })}
            </div>
            :<p> No items</p>}
          </article>
          </TabContent>

        <TabContent for="tab6">
        <article>
        {this.state.rec.length > 0 ?
          <div>
            {this.state.rec.map((el,idx) =>{
                  return <div className="edu-ex" key={idx}>
                       <p className="desc res-item">
                        "{el.text}" - <Link to={`/about/${el.author__username}`}>@{el.author__username}</Link>
                        {el.author__username === this.props.user.username ?
                          <IconButton onClick={e=>{e.preventDefault();this.deleteReview(el.id);}}><FaTimes className="delete"/></IconButton>
                        : null}
                       </p>
                  </div>
              })}
          </div>
          :<p>No items</p>}
        </article>
        </TabContent>
        </Tabs>
        </section>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      token:state.auth.token,
        user: state.auth.user,
    }
}



export default connect(mapStateToProps)(AboutView);
