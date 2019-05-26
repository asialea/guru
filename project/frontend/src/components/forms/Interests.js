import React, { Component } from 'react';
import {connect} from "react-redux";
import {FaTimes,FaPlus} from 'react-icons/fa';
import {headers,findAndRemove} from './global.js'


class Interests extends Component{

  state ={
    interest:null,
    interests:[],
    hidden:true,
    new_interest:null,
  }


  show = (e) =>{
    this.setState({hidden:!this.state.hidden})
  }

  new_interestSubmit(e){
      e.preventDefault();
      this.addInterest(this.props.user.id,this.state.interest)
    }

  addInterest_cb = () =>{
      var newArray = this.state.interests;
      newArray.push(this.state.new_interest);
      this.setState({interests:newArray},()=>{this.refs.interest.value =""});
    }

  addInterest(user_id,interest){
    let body = JSON.stringify({user_id,interest});
    headers["Authorization"] = `Token ${this.props.token}`;
    fetch("/api/interests/", {headers,body,method:"POST"}).then(res => {return res.json();})
    .then(json =>{this.setState({new_interest: json},this.addInterest_cb)})
    .catch(err => {console.log("fetch error" + err)})
      }

  deleteInterest_cb = (id)=>{
    var newArray = this.state.interests;
    findAndRemove(newArray,'id',id);
    this.setState({interests:newArray});
  }

  deleteInterest = (id) => {
      let body = JSON.stringify({id});
      fetch(`/api/interests/${id}/`, {headers,body,method:"DELETE"}).then(this.deleteInterest_cb(id))
      .then(res => {return res.json();}).catch(err => {
                console.log("fetch error" + err)})
        }

  fetchInterests(){
      return fetch(`/api/user-interests/${this.props.user.username}/`)
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
          <input className="input-small group-1" ref="interest" onChange={e => this.setState({interest: e.target.value})} placeholder="Interest" type="text"/>
          <button className = "submit"  onClick={this.new_interestSubmit.bind(this)}>Submit</button>
         </div>
        </div>
        <div>
        {this.state.interests.map((el,idx) => {
              return <div className="skill" key={idx}>
                   <span>{el.interest}<FaTimes onClick={(e) => {this.deleteInterest(el.id);}}
                   className={this.state.hidden ? 'hidden':'deleteSkill'}/></span>

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
