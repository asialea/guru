import React, { Component } from 'react';
import {connect} from "react-redux";
import {education} from "../../actions";
import {getCookie} from './get_csrf'

class Education extends Component{

  state ={
    school:"",
    degree:"",
    location:"",
    start:"",
    end:"",
  }

  eduSubmit = e => {
    e.preventDefault();
    var csrftoken = getCookie('csrftoken');
    this.props.addEducation(this.props.user.id,this.state.start,this.state.end,this.state.school, this.state.location, this.state.degree,csrftoken)
    setTimeout(function(){window.location.reload();},10);
  }

  render(){
      return(

        <form onSubmit={this.eduSubmit}>
         <div className="form-group">
          <input className="input-small group-1" onChange={e => this.setState({school: e.target.value})} placeholder="School" type="text"/>
          <input className="input-small group-1" onChange={e => this.setState({degree: e.target.value})} placeholder="Degree" type="text"/>
          <input className="input-small group-1" onChange={e => this.setState({location: e.target.value})} placeholder="Location" type="text"/>
          <input className="input-small group-2" onChange={e => this.setState({start: e.target.value})} id="start" type="date"/>
          <label>to</label>
          <input className="input-small group-2" onChange={e => this.setState({end: e.target.value})} id="end" type="date"/>
         </div>
          <button className = "submit">Submit</button>
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
    addEducation:(user_id,start,end,school,location,degree,csrftoken)=>dispatch(education.addEducation(user_id,start,end,school,location,degree,csrftoken)),
    fetchEducation: () => dispatch(education.fetchEducation()),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Education);
