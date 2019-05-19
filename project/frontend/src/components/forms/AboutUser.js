import React, { Component } from 'react';
import {connect} from "react-redux";
import {aboutUser} from "../../actions";
import '../static/AboutForm.css';
import {getCookie} from './get_csrf.js'

class AboutUser extends Component {
  state = {
    location:this.props.aboutUser.location,
    github: this.props.aboutUser.github,
    linkedin: this.props.aboutUser.linkedin,
    twitter_handle:  this.props.aboutUser.twitter_handle,
    bio: this.props.aboutUser.bio,
  }

  aboutSubmit = e => {
    e.preventDefault();
    var csrftoken= getCookie('csrftoken');
        this.props.updateAboutUser(this.state.location,this.state.github,this.state.linkedin,this.state.twitter_handle,this.state.bio,csrftoken)
        .then(this.props.fetchAboutUser()).then(window.location.reload(true))
  }

  componentDidMount(){
      this.props.fetchAboutUser();
    }

  render () {

      return (

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

      );
   }
}

const mapStateToProps = state => {
  return {
    aboutUser: state.aboutUser.user,
  };
}


const mapDispatchToProps = dispatch => {
  return {
    updateAboutUser: (location,github,linkedin,twitter_handle,bio,csrftoken) => dispatch(aboutUser.updateAboutUser(location,github,linkedin,twitter_handle,bio,csrftoken)),
    fetchAboutUser: () => dispatch(aboutUser.fetchAboutUser()),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AboutUser);
