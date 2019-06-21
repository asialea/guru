import React, { Component } from 'react';
import {connect} from "react-redux";
import {FaTimes,FaPlus} from 'react-icons/fa';
import {headers} from './global.js'

class Education extends Component{
  state ={
    school:"",
    degree:"",
    location:"",
    start:"",
    end:null,
    education:[],
    hidden:true,
    errors:null,
  }

  show = (e) =>{
    this.setState({hidden:!this.state.hidden})
  }

  new_eduSubmit(e){
    e.preventDefault();
    var edu = {"user_id":this.props.user.id,"start":this.state.start,"end":this.state.end,"school":this.state.school,
    "location":this.state.location,"degree":this.state.degree};
    this.addEducation(edu);
    this.refs.location.value =""; this.refs.start.value ="";
    this.refs.school.value =""; this.refs.end.value ="";
    this.refs.degree.value ="";

      }

  parseDate(timestamp){
    if(timestamp){
    var t = timestamp.split(/[-:T]/)
    var d = new Date(Date.UTC(t[0],t[1],t[2]));
    return d.toString().slice(4,15)
    }
  }

  addEducation(edu){
    let body = JSON.stringify(edu);
    headers["Authorization"] = `Token ${this.props.token}`;
    fetch(`/api/edu/${this.props.user.username}/`,{headers,body,method:"POST",})
      .then(res => {
        if (res.status >= 400 && res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        }
      }).then(res => {this.setState({errors: res})})
          .then(()=>this.fetchEducation())
      .catch(err => {console.log("fetch error" + err)});
  }

  deleteEducation = (id) =>{
       let body = JSON.stringify({id});
       headers["Authorization"] = `Token ${this.props.token}`;
       fetch(`/api/edu/${this.props.user.username}/`, {headers,body,method:"DELETE"}).then(res => {return res.json();})
        .then(()=>this.fetchEducation())
        .catch(err => {console.log("fetch error" + err)})
      }

  fetchEducation(){
    fetch(`/api/edu/${this.props.user.username}/`).then(response => response.json())
      .then(json =>{this.setState({education: json});})
      .catch(err => {console.log("fetch error" + err);});
                  }

  componentWillMount(){
    this.fetchEducation();
  }

  render(){
    var arr = [];
    if(this.state.errors && this.state.errors.data){
    var json =this.state.errors.data;
      Object.keys(json).forEach(function(key) {
        arr.push(json[key]);
      });
    }
      return(
      <div>
      <button onClick={this.show} className="accordion btn-animated"><FaPlus onClick={this.show} className="expand"/></button>
      <div className={this.state.hidden ? 'hidden':'form'}>
       <div className="input-flex">
        <input className="input-small" ref="school" onChange={e => this.setState({school: e.target.value})}
        maxLength="50" placeholder="School" type="text" required/>
        <input className="input-small" ref="degree" onChange={e => this.setState({degree: e.target.value})}
        maxLength="50" placeholder="Degree" type="text" required/>
        </div>
        <div className="input-flex">
        <input className="input-small" ref="location" onChange={e => this.setState({location: e.target.value})}
        maxLength="50" placeholder="Location" type="text" required/>
        <input className="input-small" ref="start" onChange={e => this.setState({start: e.target.value})} id="start" type="date"/>
        <label>to</label>
        <input className="input-small" ref="end" onChange={e => this.setState({end: e.target.value})} id="end" type="date"/>
       </div>
       <div className="input-flex">
         <button className = "submit"  onClick={this.new_eduSubmit.bind(this)}>Submit</button>
       </div>
      </div>

      <div>
        {this.state.education.map((el,idx) => {
            return <div className="edu-ex" key={el.id}>
                 <h3 className="main res-item">{el.school}, </h3><span className="res-item">{el.location} -</span>
                 <span className="position">{el.degree} </span>
                  <FaTimes className={this.state.hidden ? 'hidden':'delete'} onClick={(e) => {this.deleteEducation(el.id);}}/>
                 <p className="edu res-item">{this.parseDate(el.start)} - {this.parseDate(el.end)}</p>
            </div>
          })}
      </div>

      <ul>{arr.map((item,idx) => <li className={this.state.hidden ? 'hidden':"errors"} key={idx}> {item}</li>)}</ul>
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



export default connect(mapStateToProps)(Education);
