import React, { Component } from 'react';
import {connect} from "react-redux";
import {FaTimes,FaPlus} from 'react-icons/fa';
import {headers} from './global.js'


class Experience extends Component{

  state ={
    company:"",
    position:"",
    location:"",
    start:"",
    end:null,
    description:"",
    work:[],
    hidden:true,
    errors:null,
  }

  show = (e) =>{
    this.setState({hidden:!this.state.hidden})
  }

  new_workSubmit(e){
      e.preventDefault();
      var work = {"user_id":this.props.user.id,"company":this.state.company,"start":this.state.start,"end":this.state.end,
        "location":this.state.location,"description":this.state.description,"position":this.state.position};
      this.addWork(work);
      this.refs.location.value =""; this.refs.start.value ="";
      this.refs.position.value =""; this.refs.end.value ="";
      this.refs.company.value ="";
    }

  parseDate(timestamp){
    if(timestamp){
      var t = timestamp.split(/[-:T]/)
      var d = new Date(Date.UTC(t[0],t[1],t[2]));
      return d.toString().slice(4,15)
    }
  }

  addWork(work){
    let body = JSON.stringify(work);
    headers["Authorization"] = `Token ${this.props.token}`;
    fetch(`api/work/${this.props.user.username}/`,{headers,body,method:"POST",})
      .then(res => {
        if (res.status >= 400 && res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        }
      }).then(res => {this.setState({errors: res})})
          .then(()=>this.fetchWork())
      .catch(err => {console.log("fetch error" + err)});
    }

  deleteWork=(id)=>{
      let body = JSON.stringify({id});
      headers["Authorization"] = `Token ${this.props.token}`;
      fetch(`api/work/${this.props.user.username}/`, {headers,body,method:"DELETE"})
        .then(()=>this.fetchWork())
        .catch(err => {console.log("fetch error" + err)});
      }


  fetchWork(){
    headers["Authorization"] = `Token ${this.props.token}`;
    fetch(`/api/work/${this.props.user.username}/`, {headers})
      .then(response => { return response.json();}).then(responseData => {return responseData; })
      .then (json =>this.setState({work: json}))
      .catch(err => {console.log("fetch error" + err);
        });
  }

  componentWillMount(){
    this.fetchWork();
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
      <button onClick={this.show} className="accordion btn-animated">
      <FaPlus onClick={this.show} className="expand"/></button>
      <div className={this.state.hidden ? 'hidden':'form'}>
         <div className="input-flex">
          <input className="input-small" ref="company" onChange={e => this.setState({company: e.target.value})}
          maxLength="50" placeholder="Company" type="text"/>
          <input className="input-small" ref="position" onChange={e => this.setState({position: e.target.value})}
          maxLength="50" placeholder="Position" type="text"/>
          </div>
          <div className="input-flex">
          <input className="input-small" ref="location" onChange={e => this.setState({location: e.target.value})}
          maxLength="50" placeholder="Location" type="text"/>
          <input className="input-small" ref="start" onChange={e => this.setState({start: e.target.value})} id="start" type="date"/>
          <label>to</label>
          <input className="input-small" ref="end" onChange={e => this.setState({end: e.target.value})} id="end" type="date" />
         </div>
          <textarea onChange={e => this.setState({description: e.target.value})} maxLength="300" placeholder="Description"></textarea>
          <div className="form-group">
            <button className = "submit"  onClick={this.new_workSubmit.bind(this)}>Submit</button>
          </div>
        </div>
        <div>
        {this.state.work.map(el => {
            return <div className="edu-ex" key={el.id}>
                 <h3 className="main res-item">{el.company}, </h3><span className="res-item">{el.location} -</span>
                 <span className="position">{el.position} </span>
                 <FaTimes className={this.state.hidden ? 'hidden':'delete'} onClick={(e) => {this.deleteWork(el.id);}} />
                 <p className="date res-item">{this.parseDate(el.start)} - {this.parseDate(el.end)}</p>
                 <p className="desc res-item">{el.description}</p>
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


export default connect(mapStateToProps)(Experience);
