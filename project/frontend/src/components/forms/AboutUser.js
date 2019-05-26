import React, { Component } from 'react';
import {connect} from "react-redux";
import '../static/AboutForm.css';
import {headers,uploadConfig} from './global.js'
import {FaPlus} from 'react-icons/fa';


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

  aboutSave = (e) => {
    this.fetchAvi()
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

        <button onClick={this.show} className="table accordion btn-animated"><h2>About<FaPlus onClick={this.show} className="about-expand"/></h2></button>
        <div className={this.state.hidden ? 'hidden':'form'}>
        <button onClick={this.uploadWidget} className="submit">Pro Pic</button>
            <div>
             <div className="form-group">
              <input className="input-small" onChange={e => this.handleChange("github",e.target.value)} placeholder="Github" type="text"/>
              <input className="input-small " onChange={e => this.handleChange("linkedin",e.target.value)} placeholder="LinkedIn" type="text"/>
              <input className="input-small " onChange={e => this.handleChange("twitter_handle",e.target.value)} placeholder="Twitter" type="text"/>
             </div>
             <input className="input-small" onChange={e => this.handleChange("location",e.target.value)} placeholder="Location" type="text"/>

             <textarea onChange={e => this.handleChange("bio",e.target.value)} maxLength="500" placeholder="Bio"></textarea>
             <button className ="submit" onClick={this.aboutSave}>Save</button>
            </div>
            </div>

            <div>
            <article id="bio">
              <p className="desc res-item">{this.state.aboutUser.bio}</p>
            </article>
              <table className="table" id="about-me">
                <thead>
                </thead>
                <tbody>
                  <tr><th>Name</th><td>{this.props.user.first_name} {this.props.user.last_name}</td></tr>
                  <tr><th>Location</th><td>{this.state.aboutUser.location}</td></tr>
                  <tr><th>Email</th><td>{this.props.user.email}</td></tr>
                  <tr><th>Github</th><td>{this.state.aboutUser.github}</td></tr>
                  <tr><th>LinkedIn</th><td>{this.state.aboutUser.linkedin}</td></tr>
                  <tr><th>Twitter</th><td>{this.state.aboutUser.twitter_handle}</td></tr>
                </tbody>
              </table>
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
