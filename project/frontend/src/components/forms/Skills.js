import React, { Component } from 'react';
import {connect} from "react-redux";
import {FaTimes,FaPlus} from 'react-icons/fa';
import {headers} from './global.js'

class Skills extends Component{

  state ={
    skill:null,
    skills:[],
    hidden:true,
  }

  show = (e) =>{
    this.setState({hidden:!this.state.hidden})
  }

  new_skillSubmit(e){
    e.preventDefault();
    this.addSkill(this.props.user.id,this.state.skill)
  }

  addSkill=(user_id,skill)=>{
      let body = JSON.stringify({user_id,skill});
      headers["Authorization"] = `Token ${this.props.token}`;
      fetch(`/api/skills/${this.props.user.username}/`, {headers,body,method:"POST"}).then(res => {return res.json();})
        .then(responseData => {return responseData;})
        .then(this.refs.skill.value ="").then(()=>this.fetchSkills())
        .catch(err => {console.log("fetch error" + err)})
    }

  deleteSkill= (id) => {
    let body = JSON.stringify({id});
    headers["Authorization"] = `Token ${this.props.token}`;
    fetch(`/api/skills/${this.props.user.username}/`, {headers,body,method:"DELETE"}).then(()=>this.fetchSkills())
    .then(res => {return res.json();}).catch(err => {
              console.log("fetch error" + err)})
  }

  fetchSkills(){
    fetch(`/api/skills/${this.props.user.username}/`)
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
          <input className="input-small group-1" ref="skill" onChange={e => this.setState({skill: e.target.value})} maxLength="50" placeholder="Skill" type="text"/>
          <button className = "submit"  onClick={this.new_skillSubmit.bind(this)}>Submit</button>
         </div>
        </div>
        <div>
        {this.state.skills.map((el,idx) => {
              return <div className="skill" key={idx}>
                   <span>{el.skill}<FaTimes className={this.state.hidden ? 'hidden':'delete'} onClick={(e) => {this.deleteSkill(el.id)}}/></span>

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
