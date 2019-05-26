import React, { Component } from 'react';
import {connect} from "react-redux";
import {FaTimes,FaPlus} from 'react-icons/fa';
import {headers,findAndRemove} from './global.js'

class Skills extends Component{

  state ={
    skill:null,
    skills:[],
    hidden:true,
    new_skill:null
  }

  show = (e) =>{
    this.setState({hidden:!this.state.hidden})
  }

  new_skillSubmit(e){
    e.preventDefault();
    this.addSkill(this.props.user.id,this.state.skill)
  }

  addSkill_cb = () =>{
    var newArray = this.state.skills;
    newArray.push(this.state.new_skill);
    this.setState({skills:newArray},()=>{this.refs.skill.value ="";});
  }

  addSkill(user_id,skill){
      let body = JSON.stringify({user_id,skill});
      headers["Authorization"] = `Token ${this.props.token}`;
      fetch("/api/skills/", {headers,body,method:"POST"}).then(res => {return res.json();})
        .then(responseData => {return responseData;})
        .then(json =>{this.setState({new_skill: json},this.addSkill_cb)})
        .catch(err => {console.log("fetch error" + err)})
    }

  deleteSkill_cb = (id)=>{
    var newArray = this.state.skills;
    findAndRemove(newArray,'id',id)
    this.setState({skills:newArray})
  }

  deleteSkill= (id) => {
    let body = JSON.stringify({id});
    fetch(`/api/skills/${id}/`, {headers,body,method:"DELETE"}).then(this.deleteSkill_cb(id))
    .then(res => {return res.json();}).catch(err => {
              console.log("fetch error" + err)})
  }

  fetchSkills(){
    return fetch(`/api/user-skills/${this.props.user.username}/`)
     .then(response => {return response.json();}).then(responseData => {return responseData;})
     .then(json =>{this.setState({skills: json})})
     .catch(err => {console.log("fetch error" + err);
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
          <button className = "submit"  onClick={this.new_skillSubmit.bind(this)}>Submit</button>
         </div>
        </div>
        <div>
        {this.state.skills.map((el,idx) => {
              return <div className="skill" key={idx}>
                   <span>{el.skill}<FaTimes className={this.state.hidden ? 'hidden':'deleteSkill'} onClick={(e) => {this.deleteSkill(el.id)}}/></span>

              </div>
          })}
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

export default connect(mapStateToProps)(Skills);
