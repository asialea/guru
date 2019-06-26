import React, { Component } from 'react';
import Navbar from './Navbar';
import '../static/About.css';
import {FaGithub,FaLinkedin,FaTwitter,FaEnvelope,FaUser,FaFacebook,FaLink,FaMapMarker,FaStar,FaTimes} from 'react-icons/fa';
import ReccPopup from '../forms/ReccPopup';
import EmailPopup from '../forms/EmailPopup';
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
      emailPopup:false,
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

  toggleEmailPopup= e => {
    e.preventDefault();
    this.setState({
     emailPopup: !this.state.emailPopup
    });
  }

  render(){
    return(
    <div className="body" id="about">
      <header>
        <Navbar history={this.props.history}/>
      </header>

      <div className="flex-box">
      <div className="about-body">

      {this.state.emailPopup ?
        <EmailPopup  sender={this.props.user.email} reciever={this.state.user.email}
         text={"Send email to "+this.state.user.first_name} closePopup={this.toggleEmailPopup.bind(this)}/>
          : null}

      <section id="bio-section">
        <div className="square-container">
          <img id="pro-pic" alt="user avi" src={this.state.user.avi__avi_path}/>
        </div>
        <button id="recommend" onClick={this.togglePopup} className="submit">Write a Review</button>


        <div id="bio-contact">
            <p id="bio" className="desc res-item">{this.state.aboutUser.bio}</p>
        </div>
      </section>

      <section id="about-user">
        <p id="name">
          {this.state.user.first_name} {this.state.user.last_name}
        </p>
        {this.state.showPopup ?
          <ReccPopup fetch={this.fetchRec} username={this.props.match.params.username}
          user_id={this.state.user.id} text={"Tell us about "+this.state.user.first_name} closePopup={this.togglePopup.bind(this)}/>
        : null
        }
        <div id="star-rating">
            {this.state.avg ? Array(this.state.avg).fill(<FaStar className="social-icon star"/>):null}
        </div>
        <p><FaUser fill="#e27d60"/> @{this.state.user.username} ({this.parse_type(this.state.user.type)})</p>
        {this.state.aboutUser.location ? <p><FaMapMarker fill="#e27d60"/> {this.state.aboutUser.location}</p> : null}

        <p className="social">
        {this.state.aboutUser.github !== "" ? <a href={this.state.aboutUser.github}><FaGithub className="social-icon"/></a> : null}
        {this.state.aboutUser.linkedin !== "" ? <a href={this.state.aboutUser.linkedin}><FaLinkedin className="social-icon"/></a> :null}
        {this.state.aboutUser.twitter !== "" ? <a href={this.state.aboutUser.twitter}><FaTwitter className="social-icon"/></a>:null}
        {this.state.aboutUser.facebook !== "" ? <a href={this.state.aboutUser.facebook}><FaFacebook className="social-icon"/></a>:null}
        {this.state.aboutUser.personal !== "" ? <a href={this.state.aboutUser.personal}><FaLink className="social-icon"/></a>:null}

          <span onClick={this.toggleEmailPopup}><FaEnvelope className="social-icon"/></span>
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
          <article id="bio">
            <p className="desc res-item">{this.state.aboutUser.bio}</p>
          </article>
        </TabContent>

        <TabContent for="tab1">
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
        </TabContent>

        <TabContent for="tab2">
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
        </TabContent>

        <TabContent for="tab3">
          {this.state.skills.length > 0 ?
            <div>
            {this.state.skills.map(el => {
                  return <div className="skill" key={el.id}>
                       {el.skill} {el.level}

                  </div>
              })}
            </div>
            : <p>No items</p>}
        </TabContent>

          <TabContent for="tab4">
          {this.state.interests.length > 0 ?
            <div>
            {this.state.interests.map(el => {
                  return <div className="skill" key={el.id}>
                       {el.interest}
                  </div>
              })}
            </div>
            :<p> No items</p>}
          </TabContent>

        <TabContent for="tab6">
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
