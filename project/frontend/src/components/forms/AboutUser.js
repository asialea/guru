import React, { Component } from 'react';
import {connect} from "react-redux";
import {aboutUser,auth} from "../../actions";
import '../static/AboutForm.css';
import {getCookie} from './get_csrf.js'

class AboutUser extends Component {
  state = {
    location:this.props.aboutUser.location,
    github: this.props.aboutUser.github,
    linkedin: this.props.aboutUser.linkedin,
    twitter_handle:  this.props.aboutUser.twitter_handle,
    bio: this.props.aboutUser.bio,
    avi:{},
  }

  uploadWidget() {
    var delete_data={'user_id':this.props.aboutUser.user_id}
    fetch(`/api/avi/${this.props.aboutUser.user_id}/`,{method:'POST',body: JSON.stringify(delete_data),headers: {"Content-Type": "application/json",'X-CSRFToken':getCookie('csrftoken')},
    credentials: "same-origin"})
      .then(response => { return response.json();}).then(responseData => {return responseData;})
     .then (json =>this.setState({avi: json})).catch(err => {
           console.log("fetch error" + err);
       });

    window.cloudinary.openUploadWidget({ cloud_name: 'guruapp', upload_preset: 'pro_pic', api_key:'328295839766139',
       unsigned: true, public_id:this.props.aboutUser.user_id,return_delete_token:true,},
            function(error, result) {
              console.log(result)
              var data={'avi_path':result[0].url,'user_id':result[0].public_id,};
              fetch(`/api/avi/${result[0].public_id}`, {method: "PUT",body: JSON.stringify(data),
                    headers: {"Content-Type": "application/json",'X-CSRFToken':getCookie('csrftoken')},
                    credentials: "same-origin"
                    }).then(function(response) {
                    return response.text()
                    }, function(error) {
                })
            });
    }

  aboutSubmit = e => {
    e.preventDefault();
    var csrftoken= getCookie('csrftoken');
        this.props.updateAboutUser(this.state.location,this.state.github,this.state.linkedin,
          this.state.twitter_handle,this.state.bio,this.state.avi_path,csrftoken)
        .then(this.props.fetchAboutUser()).then(window.location.reload(true))
  }

  componentDidMount(){
      this.props.fetchAboutUser();

      fetch(`/api/avi/${this.props.aboutUser.user_id}/`)
        .then(response => { return response.json();}).then(responseData => {return responseData;})
       .then (json =>this.setState({avi: json})).catch(err => {
             console.log("fetch error" + err);
         });
    }

  render () {
      return (
<div>
        <form onSubmit={this.aboutSubmit}>
         <div className="form-group">
          <input className="input-small" onChange={e => this.setState({github: e.target.value})} placeholder="Github" type="text"/>
          <input className="input-small " onChange={e => this.setState({linkedin: e.target.value})} placeholder="LinkedIn" type="text"/>
          <input className="input-small " onChange={e => this.setState({twitter_handle: e.target.value})} placeholder="Twitter" type="text"/>
         </div>
         <input className="input-small" onChange={e => this.setState({location: e.target.value})} placeholder="Location" type="text"/>

         <textarea onChange={e => this.setState({bio: e.target.value})} maxLength="500" placeholder="Bio"></textarea>
         <button className = "submit">Submit</button>
        </form>


        <button onClick={this.uploadWidget.bind(this)} className="upload-button">
            Add Image
        </button>

</div>
      );
   }
}

const mapStateToProps = state => {
  return {
    aboutUser: state.aboutUser.user,
    token:state.auth.token,
  };
}


const mapDispatchToProps = dispatch => {
  return {
    updateAboutUser: (location,github,linkedin,twitter_handle,bio,avi_path,csrftoken) => dispatch(aboutUser.updateAboutUser(location,github,linkedin,twitter_handle,bio,avi_path,csrftoken)),
    fetchAboutUser: () => dispatch(aboutUser.fetchAboutUser()),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AboutUser);
