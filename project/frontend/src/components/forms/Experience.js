import React, { Component } from 'react';
import {connect} from "react-redux";
import {FaTimes,FaPlus} from 'react-icons/fa';
import {headers,findAndRemove} from './global.js'


class Experience extends Component{

  state ={
    company:"",
    position:"",
    location:"",
    start:"",
    end:null,
    description:"",

    new_work:null,
    work:[],
    hidden:true,
  }

  show = (e) =>{
    this.setState({hidden:!this.state.hidden})
  }

  new_workSubmit(e){
      e.preventDefault();
      var work = {"user_id":this.props.user.id,"company":this.state.company,"start":this.state.start,"end":this.state.end,
        "location":this.state.location,"description":this.state.description,"position":this.state.position};
      this.setState({new_work:work},()=>this.addWork(this.state.new_work));
      this.refs.location.value =""; this.refs.start.value ="";
      this.refs.position.value =""; this.refs.end.value ="";
      this.refs.company.value ="";
    }

    addWork_cb = () =>{
        var newArray = this.state.work;
        newArray.push(this.state.new_work);
        this.setState({work:newArray});
      }


  addWork(work){
    let body = JSON.stringify(work);
    headers["Authorization"] = `Token ${this.props.token}`;
    fetch(`api/work/`,{headers,body,method:"POST",}).then(res => {return res.json();})
    .then(this.addWork_cb)
    .catch(err => {console.log("fetch error" + err)})
    }

  deleteWork_cb =(id)=>{
    var newArray = this.state.work;
    findAndRemove(newArray,'id',id);
    this.setState({work:newArray});
    }

  deleteWork=(id)=>{
      let body = JSON.stringify({id});
      headers["Authorization"] = `Token ${this.props.token}`;
     fetch(`api/work/${id}/`, {headers,body,method:"DELETE"}).then(this.deleteWork_cb(id))
      .then(res => {return res.json();}).catch(err => {console.log("fetch error" + err)});
      }


  fetchWork(){
     fetch(`/api/user-work/${this.props.user.username}/`)
       .then(response => { return response.json();}).then(responseData => {return responseData; })
      .then (json =>this.setState({work: json})).catch(err => {
            console.log("fetch error" + err);
        });
  }

  componentWillMount(){
    this.fetchWork();
  }

  render(){
      return(
      <div>
      <button onClick={this.show} className="accordion btn-animated"><h2>Experience<FaPlus onClick={this.show} className="expand"/></h2></button>
      <div className={this.state.hidden ? 'hidden':'form'}>
         <div className="form-group">
          <input className="input-small group-1" ref="company" onChange={e => this.setState({company: e.target.value})} placeholder="Company" type="text"/>
          <input className="input-small group-1" ref="position" onChange={e => this.setState({position: e.target.value})} placeholder="Position" type="text"/>
          <input className="input-small group-1" ref="location" onChange={e => this.setState({location: e.target.value})} placeholder="Location" type="text"/>
          <input className="input-small group-2" ref="start" onChange={e => this.setState({start: e.target.value})} id="start" type="date"/>
          <label>to</label>
          <input className="input-small group-2" ref="end" onChange={e => this.setState({end: e.target.value})} id="end" type="date" />
         </div>
          <textarea onChange={e => this.setState({description: e.target.value})} maxLength="300" placeholder="Description"></textarea>
          <div className="form-group">
            <button className = "submit"  onClick={this.new_workSubmit.bind(this)}>Submit</button>
          </div>
        </div>
        <div>
        {this.state.work.map(el => {
              return <div key={el.id}>
                   <h3 className="main res-item">{el.company}, </h3><span className="res-item">{el.location} -</span>
                   <span className="position">{el.position} </span>
                   <FaTimes className={this.state.hidden ? 'hidden':'deleteSkill'} onClick={(e) => {this.deleteWork(el.id);}} />
                   <p className="date res-item">{el.start} to {el.end}</p>
                   <p className="desc res-item">{el.description}</p>
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


export default connect(mapStateToProps)(Experience);
