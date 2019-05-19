import React, { Component } from 'react';
import {connect} from "react-redux";
import {interests} from "../../actions";
import {getCookie} from './get_csrf'

class Interests extends Component{

  state ={
    interest:"",
  }

  interestSubmit = e => {
    e.preventDefault();
    var csrftoken = getCookie('csrftoken');
    this.props.addInterest(this.props.user.id,this.state.interest,csrftoken);
    setTimeout(function(){window.location.reload();},10);
  }

  render(){
      return(

        <form onSubmit={this.interestSubmit}>
         <div className="form-group">
          <input className="input-small group-1" onChange={e => this.setState({interest: e.target.value})} placeholder="Interest" type="text"/>
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
    addInterest:(user_id,interest,csrftoken)=>dispatch(interests.addInterest(user_id,interest,csrftoken)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Interests);
