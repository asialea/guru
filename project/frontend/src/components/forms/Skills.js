import React, { Component } from 'react';
import {connect} from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import {FaTimes,FaPlus} from 'react-icons/fa';
import {headers} from './global.js'

class Skills extends Component{

  state ={
    skill:"",
    skills:[],
    new_skills:[],
    hidden:true,
  }

  show = (e) =>{
    this.setState({hidden:!this.state.hidden})
  }

  new_skillSubmit = e => {
    e.preventDefault();
    var newArray = this.state.new_skills.slice();
    newArray.push(this.state.skill);
    this.setState({new_skills:newArray});
    this.refs.skill.value ="";
  }

  saveSkills=(e)=>{
    this.state.new_skills.map(x=>{this.addSkill(this.props.user.id,x)})
    this.fetchSkills()
    this.show()
  }


addSkill(user_id,skill){
    let body = JSON.stringify({user_id,skill});
    fetch("/api/skills/", {headers,body,method:"POST"}).then(res => {return res.json();})
      .catch(err => {console.log("fetch error" + err)})
  }

delete_newSkill = (e)=>{
  var newArray = this.state.new_skills.slice(0, -1);
  this.setState({new_skills:newArray})
}

deleteSkill= (id) =>{
  let body = JSON.stringify({id});
  fetch(`/api/skills/${id}/`, {headers,body,method:"DELETE"})
  .then(res => {return res.json();}).catch(err => {
            console.log("fetch error" + err)})
}

  fetchSkills(){
    fetch(`/api/user-skills/${this.props.user.username}/`)
     .then(response => { return response.json();}).then(responseData => {return responseData;})
     .then (json =>this.setState({skills: json})).catch(err => {console.log("fetch error" + err);
      });
  }

  componentWillMount(){
    this.fetchSkills()
  }

  render(){
      return(
      <div>
      <button onClick={this.show} className="accordion btn-animated"><h2>Skills<FaPlus onClick={this.show} className="expand"/></h2></button>
        <div className={this.state.hidden ? 'hidden':'form'}>
         <div className="form-group">
          <input className="input-small group-1" ref="skill" onChange={e => this.setState({skill: e.target.value})} placeholder="Skill" type="text"/>
          <button className = "submit"  onClick={this.new_skillSubmit}>Submit</button>
          <button className = "submit"  onClick={this.saveSkills}>Save</button>
         </div>
        </div>
        <div>
        {this.state.skills.map(el => {
              return <div className="skill" key={el.id}>
                   <span>{el.skill}<FaTimes className={this.state.hidden ? 'hidden':'deleteSkill'} onClick={(e) => {this.deleteSkill(el.id);}}/></span>

              </div>
          })}
          {this.state.new_skills.map((el,idx) => {
                return <div className="skill" key={idx}>
                     <span>{el}<FaTimes onClick={this.delete_newSkill} className={this.state.hidden ? 'hidden':'deleteSkill'}/></span>

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
