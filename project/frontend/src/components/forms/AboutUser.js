import React, { Component } from 'react';
import {connect} from "react-redux";
import {headers,uploadConfig} from './global.js'
import {FaGithub,FaLinkedin,FaTwitter} from 'react-icons/fa';

class AboutUser extends Component {

  state = {
    aboutUser:{},
    avi:{},
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
    fetch("/api/aboutUser/", {headers,body,method:"PATCH",mode:"same-origin"})
      .then(()=>this.props.fetchAboutUser())
  }


  aboutSave = (e) => {
    e.preventDefault();
    this.props.fetchAvi()
    delete this.state.aboutUser['user_id']
    this.updateAboutUser(this.state.aboutUser)
  }


  handleChange(param,value){
    let updatedUser = this.state.aboutUser;
    updatedUser[param]=value;
    this.setState({aboutUser:updatedUser})
  }

  render () {
    var aboutUser=this.props.aboutUser;
      return (
        <div>
        <div className="flex-box">
        </div>
        <div className={this.props.hidden ? 'hidden':'form'}>
        <button onClick={this.uploadWidget} id="pro-upload" className="submit">Pro Pic</button>
            <form  onSubmit={this.aboutSave}>

                <input defaultValue={aboutUser.github} className="input-small" onChange={e => this.handleChange("github",e.target.value)}
                maxLength="200" placeholder="Github Url" type="url"/>
                <input defaultValue={aboutUser.linkedin} className="input-small" onChange={e => this.handleChange("linkedin",e.target.value)}
                maxLength="100" placeholder="Linkedin Url" type="url"/>
                <input defaultValue={aboutUser.twitter_handle} className="input-small" onChange={e => this.handleChange("twitter_handle",e.target.value)}
                maxLength="100" placeholder="Twitter Url" type="url"/>

               <input defaultValue={aboutUser.location} className="input-small" onChange={e => this.handleChange("location",e.target.value)}
               maxLength="30" placeholder="Location" type="text"/>

               <textarea defaultValue={aboutUser.bio} onChange={e => this.handleChange("bio",e.target.value)} maxLength="500" placeholder="Bio"></textarea>
               <button className ="submit">Save</button>
            </form>
        </div>
        <div>
          <span className="social">
            <a href={this.props.aboutUser.github}><FaGithub className="social-icon"/></a>
            <a href={this.props.aboutUser.linkedin}><FaLinkedin className="social-icon"/></a>
            <a href={this.props.aboutUser.twitter_handle}><FaTwitter className="social-icon"/></a>
          </span>
          <article id="bio">
            <p className="desc res-item">{this.props.aboutUser.bio}</p>
          </article>
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
