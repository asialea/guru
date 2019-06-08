import React, { Component } from 'react';
import {connect} from "react-redux";
import '../static/AboutForm.css';
import {headers,uploadConfig} from './global.js'
import {FaGithub,FaLinkedin,FaTwitter,FaEdit,FaCode,FaUser,FaHome} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';

class AboutUser extends Component {

  state = {
    aboutUser:{},
    avi:{},
    hidden:true,
  }

  show = (e) =>{
    this.setState({hidden:!this.state.hidden});
  }

  uploadWidget=(e)=> {
    //delete existing profile pic from cloud storage
    var delete_data={'user_id':this.props.user.id};
    fetch(`/api/avi/${this.props.user.id}/`,{method:'POST',body: JSON.stringify(delete_data),headers,})
      .then(response => { return response.json();}).then (json =>this.setState({avi: json}))
      .catch(err => {console.log("fetch error" + err);
       });
    // set new profile pic
    uploadConfig['public_id']=this.props.user.id;
    window.cloudinary.openUploadWidget(uploadConfig,function(error, result) {
            if(result){
              var data={'avi_path':result[0].url,'user_id':result[0].public_id,};
              fetch(`/api/avi/${result[0].public_id}`, {method: "PUT",body: JSON.stringify(data),headers:headers})
                .then(function(response) {
                      return response.text()
                    }, function(error) {
                        console.log(error);})
                    }
                  });
                }

  updateAboutUser(user){
    let body = JSON.stringify(user);
    headers["Authorization"] = `Token ${this.props.token}`;
    fetch("/api/aboutUser/", {headers,body,method:"PUT",mode:"same-origin"})
      .then(res => res.json())
  }

  parse_type(type){
    return (type ==='MR' ? 'Mentor' : 'Mentee')
  }

  aboutSave = (e) => {
    e.preventDefault();
    this.fetchAvi();
    delete this.state.aboutUser['user_id']
    this.updateAboutUser(this.state.aboutUser)
    this.show();
  }

  fetchAvi(){
    fetch(`/api/avi/${this.props.user.id}/`)
      .then(response => { return response.json();}).then(json =>this.setState({avi: json}))
      .catch(err => {console.log("fetch error" + err);});
            }

  fetchAboutUser(){
    fetch(`/api/aboutUser/${this.props.user.username}/`)
      .then(response => { return response.json();}).then(json =>this.setState({aboutUser: json}))
      .catch(err => {console.log("fetch error" + err);})
  }

  handleChange(param,value){
    let updatedUser = this.state.aboutUser;
    updatedUser[param]=value;
    this.setState({aboutUser:updatedUser})
  }

  componentWillMount(){
      this.fetchAvi();
      this.fetchAboutUser();
    }

  render () {
    var proPic = {backgroundImage:'url(' + this.state.avi.avi_path + ')'};
      return (
        <div>
        <div className="flex-box">
          <div id="pro-pic" style={proPic}></div>
        </div>
        <div className={this.state.hidden ? 'hidden':'form'}>
        <button onClick={this.uploadWidget} id="pro-upload" className="submit">Pro Pic</button>
            <form  onSubmit={this.aboutSave}>
               <div className="form-group">
                <input className="input-small" onChange={e => this.handleChange("github",e.target.value)}
                maxLength="200" placeholder="Github Url" type="url"/>
                <input className="input-small " onChange={e => this.handleChange("linkedin",e.target.value)}
                maxLength="100" placeholder="Linkedin Url" type="url"/>
                <input className="input-small " onChange={e => this.handleChange("twitter_handle",e.target.value)}
                maxLength="100" placeholder="Twitter Url" type="url"/>
               </div>
               <input className="input-small" onChange={e => this.handleChange("location",e.target.value)}
               maxLength="30" placeholder="Location" type="text"/>

               <textarea onChange={e => this.handleChange("bio",e.target.value)} maxLength="500" placeholder="Bio"></textarea>
               <button className ="submit">Save</button>
            </form>
        </div>
            <h1 id="name">{this.props.user.first_name} {this.props.user.last_name}
              <IconButton onClick={this.show}><FaEdit  className="about-expand"/></IconButton>
            </h1>
            <p className="caption">
              <span><FaUser/>@{this.props.user.username}</span>
              <span><FaHome className="left"/>{this.state.aboutUser.location}</span>
              <span><FaCode className="left"/>{this.parse_type(this.props.user.type)}</span>
            </p>
            <div>
            <article id="bio">
              <p className="desc res-item">{this.state.aboutUser.bio}</p>
            </article>

            <div  id="contact">
              <a href={this.state.aboutUser.github}><FaGithub className="social"/></a>
              <a href={this.state.aboutUser.linkedin}><FaLinkedin className="social"/></a>
              <a href={this.state.aboutUser.twitter_handle}><FaTwitter className="social"/></a>
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
  };
}

export default connect(mapStateToProps)(AboutUser);
