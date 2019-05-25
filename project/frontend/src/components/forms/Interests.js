import React, { Component } from 'react';
import {connect} from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import {FaTimes,FaPlus} from 'react-icons/fa';
import {headers} from './global.js'


class Interests extends Component{

  state ={
    interest:"",
    interests:[],
    new_interests:[],
    hidden:true,
  }


  show = (e) =>{
    this.setState({hidden:!this.state.hidden})
  }

  new_interestSubmit = (e) => {
      e.preventDefault();
      var newArray = this.state.new_interests.slice();
      newArray.push(this.state.interest);
      this.setState({new_interests:newArray});
      this.refs.interest.value ="";
    }

  saveInterests=(e)=>{
    this.state.new_interests.map(x=>{this.addInterest(this.props.user.id,x)})
    this.fetchInterests()
    this.show()
  }

  addInterest(user_id,interest){
    let body = JSON.stringify({user_id,interest});
    fetch("/api/interests/", {headers,body,method:"POST"}).then(res => {return res.json();}).catch(err => {
              console.log("fetch error" + err)})
      }

  delete_newInterest = (e)=>{
    var newArray = this.state.new_interests.slice(0, -1);
    this.setState({new_interests:newArray})
  }



  deleteInterest = (id) => {
      let body = JSON.stringify({id});
      fetch(`/api/interests/${id}/`, {headers,body,method:"DELETE"})
      .then(res => {return res.json();}).catch(err => {
                console.log("fetch error" + err)}).then(this.fetchInterests())
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
      <button onClick={this.show} className="accordion btn-animated"><h2>Interests<FaPlus onClick={this.show} className="expand"/></h2></button>
        <div className={this.state.hidden ? 'hidden':'form'}>
         <div className="form-group">
          <input className="input-small group-1" ref="interest" onChange={e => this.setState({interest: e.target.value})} placeholder="Interest" type="text"/>
          <button className = "submit"  onClick={this.new_interestSubmit}>Submit</button>
          <button className = "submit"  onClick={this.saveInterests}>Save</button>
         </div>
        </div>
        <div>
        {this.state.interests.map(el => {
              return <div className="skill" key={el.id}>
                   <span>{el.interest}<FaTimes onClick={(e) => {this.deleteInterest(el.id);}}
                   className={this.state.hidden ? 'hidden':'deleteSkill'}/></span>

              </div>
          })}
        {this.state.new_interests.map((el,idx) => {
              return <div className="skill" key={idx}>
                   <span>{el}<FaTimes onClick={this.delete_newInterest} className={this.state.hidden ? 'hidden':'deleteSkill'}/></span>

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
