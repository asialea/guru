import React, { Component } from 'react';
import {connect} from "react-redux";
import {skills} from "../../actions";
import {getCookie} from './get_csrf'

class Skills extends Component{

  state ={
    skill:"",
  }

  skillSubmit = e => {
    e.preventDefault();
    var csrftoken = getCookie('csrftoken');
    this.props.addSkill(this.props.user.id,this.state.skill,csrftoken);
    setTimeout(function(){window.location.reload();},10);
  }

  render(){
      return(

        <form onSubmit={this.skillSubmit}>
         <div className="form-group">
          <input className="input-small group-1" onChange={e => this.setState({skill: e.target.value})} placeholder="Skill" type="text"/>
          <button className = "submit">Submit</button>
         </div>
        </form>
      );
  }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    addSkill:(user_id,skill,csrftoken)=>dispatch(skills.addSkill(user_id,skill,csrftoken)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
