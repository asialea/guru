import React, { Component } from 'react';
import {connect} from "react-redux";
import {work} from "../../actions";
import {getCookie} from './get_csrf'

class Experience extends Component{

  state ={
    company:"",
    position:"",
    location:"",
    start:"",
    end:null,
    description:"",
  }

  workSubmit = e => {
    e.preventDefault();
    var csrftoken = getCookie('csrftoken');
    this.props.addWork(this.props.user.id,this.state.company,this.state.position,this.state.location,this.state.start, this.state.end, this.state.description,csrftoken)
    setTimeout(function(){window.location.reload();},10);
  }

  render(){
      return(

        <form onSubmit={this.workSubmit}>
         <div className="form-group">
          <input className="input-small group-1" onChange={e => this.setState({company: e.target.value})} placeholder="Company" type="text"/>
          <input className="input-small group-1" onChange={e => this.setState({position: e.target.value})} placeholder="Position" type="text"/>
          <input className="input-small group-1" onChange={e => this.setState({location: e.target.value})} placeholder="Location" type="text"/>
          <input className="input-small group-2" onChange={e => this.setState({start: e.target.value})} id="start" type="date"/>
          <label>to</label>
          <input className="input-small group-2" onChange={e => this.setState({end: e.target.value})} id="end" type="date" />
         </div>
          <textarea onChange={e => this.setState({description: e.target.value})} maxLength="300" placeholder="Description"></textarea>
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
    addWork:(user_id,company,position,location,start,end,description,csrftoken)=>dispatch(work.addWork(user_id,company,position,location,start,end,description,csrftoken)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience);
