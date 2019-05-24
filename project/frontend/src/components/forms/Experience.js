import React, { Component } from 'react';
import {connect} from "react-redux";
import IconButton from '@material-ui/core/IconButton';
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
  }

workSubmit = e => {
  this.addWork(this.props.user.id,this.state.company,this.state.position,this.state.location,
    this.state.start, this.state.end, this.state.description)
}

addWork(user_id,company,position,location,start,end,description){
  let body = JSON.stringify({user_id,company,position,location,start,end,description});
  fetch(`api/work/`,{headers,body,method:"POST",}).then(res => {return res.json();}).catch(err => {
            console.log("fetch error" + err)}).then(this.fetchWork());
  }

  fetchWork(){
     fetch(`/api/user-work/${this.props.user.username}/`)
       .then(response => { return response.json();}).then(responseData => {return responseData; })
      .then (json =>this.setState({work: json})).catch(err => {
            console.log("fetch error" + err);
        });
  }

deleteWork(id,event){
    let body = JSON.stringify({id});
   fetch(`api/work/${id}/`, {headers,body,method:"DELETE"})
    .then(res => {return res.json();}).catch(err => {console.log("fetch error" + err)}).then(this.fetchWork());
    event.preventDefault();
    }

  componentWillMount(){
    this.fetchWork();
  }

  render(){
      return(
      <div>
      <button className="accordion btn-animated"><h2>Experience<FaPlus className="expand"/></h2></button>
        <form className="form" onSubmit={this.workSubmit}>
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
        <div>
        {this.state.work.map(el => {
              return <div key={el.id}>
                   <h3 className="main res-item">{el.company}, </h3><span className="res-item">{el.location} -</span>
                   <span className="position">{el.position} </span>
                   <IconButton className="delete" onClick={this.deleteWork.bind(this, el.id)} ><FaTimes/></IconButton>
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
        user: state.auth.user,
    }
}


export default connect(mapStateToProps)(Experience);
