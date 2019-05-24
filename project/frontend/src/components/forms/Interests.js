import React, { Component } from 'react';
import {connect} from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import {FaTimes,FaPlus} from 'react-icons/fa';
import {headers} from './global.js'


class Interests extends Component{

  state ={
    interest:"",
    interests:[],
  }

  interestSubmit = e => {
    // e.preventDefault();
    this.addInterest(this.props.user.id,this.state.interest);
  }

addInterest(user_id,interest){
  let body = JSON.stringify({user_id,interest});
fetch("/api/interests/", {headers,body,method:"POST"}).then(res => {return res.json();}).catch(err => {
          console.log("fetch error" + err)}).then(this.fetchInterests());
    }


deleteInterest = (id) => {
    let body = JSON.stringify({id});
    fetch(`/api/interests/${id}/`, {headers,body,method:"DELETE"})
    .then(res => {return res.json();}).catch(err => {
              console.log("fetch error" + err)}).then(this.fetchInterests());
      }

  fetchInterests(){
      fetch(`/api/user-interests/${this.props.user.username}/`)
       .then(response => { return response.json();}).then(responseData => {return responseData;})
      .then (json =>this.setState({interests: json})).catch(err => {
            console.log("fetch error" + err);
                    });
            }

  componentWillMount(){
    this.fetchInterests()
  }

  render(){
      return(
      <div>
      <button className="accordion btn-animated"><h2>Interests<FaPlus className="expand"/></h2></button>
        <form className="form" onSubmit={this.interestSubmit}>
         <div className="form-group">
          <input className="input-small group-1" onChange={e => this.setState({interest: e.target.value})} placeholder="Interest" type="text"/>
          <button className = "submit">Submit</button>
         </div>
        </form>
        <div>
        {this.state.interests.map(el => {
              return <div className="skill" key={el.id}>
                   {el.interest}<IconButton className="deleteSkill" onClick={this.deleteInterest.bind(this, el.id)} ><FaTimes/></IconButton>

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



export default connect(mapStateToProps)(Interests);
