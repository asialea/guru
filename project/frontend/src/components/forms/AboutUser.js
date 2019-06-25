import React, { Component } from 'react';
import {connect} from "react-redux";
import {headers,uploadConfig} from './global.js'
import {FaPlus,FaCamera} from 'react-icons/fa';
import TextareaAutosize from 'react-textarea-autosize';
import IconButton from '@material-ui/core/IconButton';


class AboutUser extends Component {

  state = {
    aboutUser:{},
    avi:{},
    url:null,
    site:null,
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
    this.props.fetchAvi();
    delete this.state.aboutUser['user_id'];
    this.updateAboutUser(this.state.aboutUser);
    this.props.show();
  }


  handleChange(param,value){
    let updatedUser = this.state.aboutUser;
    updatedUser[param]=value;
    this.setState({aboutUser:updatedUser})
    console.log(updatedUser)
  }

  render () {
    var aboutUser=this.props.aboutUser;
      return (
        <div>
        <div className="flex-box">
        </div>
        <div className={this.props.hidden ? 'hidden':'form'}>
          <form  onSubmit={this.aboutSave}>
          <div className="input-flex-2">
            <IconButton onClick={this.uploadWidget}><FaCamera color="#374054"/></IconButton>
            <input defaultValue="http://" id="url" className="input-small"
            maxLength="200" placeholder="Url" type="text" onChange={e => this.setState({url:e.target.value})}/>
            <select className="input-small" onChange={e => this.setState({site:e.target.value})}>
              <option value=""></option>
              <option value="github">Github</option>
              <option value="linkedin">Linkedin</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
              <option value="personal">Personal</option>
            </select>
            <IconButton className="expand" onClick={e => {this.handleChange(this.state.site,this.state.url); alert("Url added")}}>
            <FaPlus color="#374054"/></IconButton>

          </div>

           <input defaultValue={aboutUser.location} className="about-input" onChange={e => this.handleChange("location",e.target.value)}
           maxLength="30" placeholder="Location" type="text"/>

           <TextareaAutosize defaultValue={aboutUser.bio} onChange={e => this.handleChange("bio",e.target.value)} maxLength="500"
           placeholder="Bio" minRows={1} maxRows={1}/>
           <button className ="submit">Save</button>
          </form>
        </div>
        <div>
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
