import React, { Component } from 'react';
import {connect} from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import {FaTimes,FaPlus} from 'react-icons/fa';
import {headers} from './global.js'

class Skills extends Component{

  state ={
    skill:"",
    skills:[],
  }

  skillSubmit = e => {
    // e.preventDefault();
    this.addSkill(this.props.user.id,this.state.skill);
  }

addSkill(user_id,skill){
    let body = JSON.stringify({user_id,skill});
    fetch("/api/skills/", {headers,body,method:"POST",mode:"same-origin"})
    .then(res => {return res.json();}).catch(err => {
              console.log("fetch error" + err)}).then(this.fetchSkills());
  }

deleteSkill(id){
  let body = JSON.stringify({id});
  fetch(`/api/skills/${id}/`, {headers,body,method:"DELETE"})
  .then(res => {return res.json();}).catch(err => {
            console.log("fetch error" + err)}).then(this.fetchSkills());
}

  fetchSkills(){
    fetch(`/api/user-skills/${this.props.user.username}/`)
     .then(response => { return response.json();}).then(responseData => {return responseData;})
    .then (json =>this.setState({skills: json})).catch(err => {
          console.log("fetch error" + err);
      });
  }

  componentWillMount(){
    this.fetchSkills()
  }

  render(){
      return(
      <div>
      <button className="accordion btn-animated"><h2>Skills<FaPlus className="expand"/></h2></button>
        <form className="form" onSubmit={this.skillSubmit}>
         <div className="form-group">
          <input className="input-small group-1" onChange={e => this.setState({skill: e.target.value})} placeholder="Skill" type="text"/>
          <button className = "submit">Submit</button>
         </div>
        </form>
        <div>
        {this.state.skills.map(el => {
              return <div className="skill" key={el.id}>
                   {el.skill} {el.level}<IconButton className="deleteSkill" onClick={this.deleteSkill.bind(this, el.id)} ><FaTimes/></IconButton>

              </div>
          })}
        </div>
      </div>
      );
  }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(Skills);
