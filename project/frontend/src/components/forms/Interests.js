import React, { Component } from 'react';
import {connect} from "react-redux";
import {FaTimes,FaPlus} from 'react-icons/fa';
import {headers} from './global.js'


class Interests extends Component{

  state ={
    interest:null,
    interests:[],
    hidden:true,
  }

  show = (e) => {
    this.setState({hidden:!this.state.hidden})
  }

  new_interestSubmit(e){
      e.preventDefault();
      this.addInterest(this.props.user.id,this.state.interest)
    }

  addInterest = (user_id,interest) => {
    let body = JSON.stringify({user_id,interest});
    headers["Authorization"] = `Token ${this.props.token}`;
    fetch(`/api/interests/${this.props.user.username}/`, {headers,body,method:"POST"}).then(res => {return res.json();})
    .then(this.refs.interest.value ="").then(()=>this.fetchInterests())
    .catch(err => {console.log("fetch error" + err)})
      }


  deleteInterest = (id) => {
      let body = JSON.stringify({id});
      headers["Authorization"] = `Token ${this.props.token}`;
      fetch(`/api/interests/${this.props.user.username}/`, {headers,body,method:"DELETE"}).then(()=>this.fetchInterests())
      .then(res => {return res.json();}).catch(err => {
                console.log("fetch error" + err)})
        }

  fetchInterests(){
     fetch(`/api/interests/${this.props.user.username}/`)
        .then(response => { return response.json();}).then(responseData => {return responseData;})
        .then (json =>this.setState({interests: json}))
        .catch(err => {console.log("fetch error" + err);
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
          <input className="input-small group-1" ref="interest" onChange={(e) => this.setState({interest: e.target.value})}
          maxLength="50" placeholder="Interest" type="text"/>
          <button className = "submit"  onClick={this.new_interestSubmit.bind(this)}>Submit</button>
         </div>
        </div>
        <div>
        {this.state.interests.map((el,idx) => {
              return <div className="skill" key={idx}>
                   <span>{el.interest}<FaTimes onClick={(e) => {this.deleteInterest(el.id);}}
                   className={this.state.hidden ? 'hidden':'delete'}/></span>

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



export default connect(mapStateToProps)(Interests);
