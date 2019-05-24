import React, { Component } from 'react';
import {connect} from "react-redux";
import IconButton from '@material-ui/core/IconButton';
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
  }

eduSubmit = e => {
  this.addEducation(this.props.user.id,this.state.start,this.state.end,this.state.school, this.state.location, this.state.degree);
    }

deleteEducation(id,event){
     let body = JSON.stringify({id});
     fetch(`api/education/${id}/`, {headers,body,method:"DELETE"})
      .then(res => {return res.json();}).catch(err => {console.log("fetch error" + err)}).then(this.fetchEducation());
      event.preventDefault();
    }

addEducation(user_id,start,end,school,location,degree){
  let body = JSON.stringify({user_id,start,end,school,location,degree});
  fetch(`api/education/`,{headers,body,method:"POST",}).then(res => {return res.json();}).catch(err => {
            console.log("fetch error" + err)}).then(this.fetchEducation());
}

fetchEducation(){
  fetch(`/api/user-edu/${this.props.user.username}/`).then(response => response.json())
    .then(json =>{this.setState({education: json});})
    .catch(err => {console.log("fetch error" + err);});
                }

componentWillMount(){
  this.fetchEducation();
}

  render(){
    var state = this.state;
      return(
      <div>
      <button className="accordion btn-animated"><h2>Education<FaPlus className="expand"/></h2></button>
        <form className="form" onSubmit={this.eduSubmit}>
         <div className="form-group">
          <input className="input-small group-1" onChange={e => this.setState({school: e.target.value})} placeholder="School" type="text" required/>
          <input className="input-small group-1" onChange={e => this.setState({degree: e.target.value})} placeholder="Degree" type="text" required/>
          <input className="input-small group-1" onChange={e => this.setState({location: e.target.value})} placeholder="Location" type="text" required/>
          <input className="input-small group-2" onChange={e => this.setState({start: e.target.value})} id="start" type="date"/>
          <label>to</label>
          <input className="input-small group-2" onChange={e => this.setState({end: e.target.value})} id="end" type="date"/>
         </div>
          <button className ="submit">Submit</button>
        </form>

        <div>
          {state.education.map((el,idx) => {
                return <div key={el.id}>
                     <h3 className="main res-item">{el.school}, </h3><span className="res-item">{el.location} -</span>
                     <span className="position">{el.degree} </span>
                     <IconButton className="delete" onClick={this.deleteEducation.bind(this, el.id)} ><FaTimes/></IconButton>
                     <p className="date res-item">{el.start} to {el.end}</p>
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



export default connect(mapStateToProps)(Education);
