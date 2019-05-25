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

    new_edus:[],
    hidden:true,
  }
  show = (e) =>{
    this.setState({hidden:!this.state.hidden})
  }

  new_eduSubmit = e => {
    e.preventDefault();
    var newArray = this.state.new_edus.slice();
    var edu = {"user_id":this.props.user.id,"start":this.state.start,"end":this.state.end,"school":this.state.school,
    "location":this.state.location,"degree":this.state.degree};
    newArray.push(edu);
    this.setState({new_edus:newArray})
      }

  saveEdus=(e)=>{
    this.state.new_edus.map(x=>{this.addEducation(x)});
    this.fetchEducation();
    this.show();
  }

  addEducation(edu){
    let body = JSON.stringify(edu);
    console.log(body);
    fetch(`api/education/`,{headers,body,method:"POST",}).then(res => {return res.json();}).catch(err => {
              console.log("fetch error" + err)});
  }

  delete_newEdu = (e)=>{
    var newArray = this.state.new_edus.slice(0, -1);
    this.setState({new_edus:newArray})
  }


  deleteEducation = (id) =>{
       let body = JSON.stringify({id});
       fetch(`api/education/${id}/`, {headers,body,method:"DELETE"})
        .then(res => {return res.json();}).catch(err => {console.log("fetch error" + err)}).then(this.fetchEducation());
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
      return(
      <div>
      <button onClick={this.show} className="accordion btn-animated"><h2>Education<FaPlus onClick={this.show} className="expand"/></h2></button>
      <div className={this.state.hidden ? 'hidden':'form'}>
       <div className="form-group">
        <input className="input-small group-1" onChange={e => this.setState({school: e.target.value})} placeholder="School" type="text" required/>
        <input className="input-small group-1" onChange={e => this.setState({degree: e.target.value})} placeholder="Degree" type="text" required/>
        <input className="input-small group-1" onChange={e => this.setState({location: e.target.value})} placeholder="Location" type="text" required/>
        <input className="input-small group-2" onChange={e => this.setState({start: e.target.value})} id="start" type="date"/>
        <label>to</label>
        <input className="input-small group-2" onChange={e => this.setState({end: e.target.value})} id="end" type="date"/>
       </div>
       <div className="form-group">
         <button className = "submit"  onClick={this.new_eduSubmit}>Submit</button>
         <button className = "submit"  onClick={this.saveEdus}>Save</button>
       </div>
      </div>

        <div>
          {this.state.education.map((el,idx) => {
                return <div key={el.id}>
                     <h3 className="main res-item">{el.school}, </h3><span className="res-item">{el.location} -</span>
                     <span className="position">{el.degree} </span>
                      <FaTimes className={this.state.hidden ? 'hidden':'deleteSkill'} onClick={(e) => {this.deleteEducation(el.id);}}/>
                     <p className="date res-item">{el.start} to {el.end}</p>
                </div>
            })}
            {this.state.new_edus.map((el,idx) => {
                  return <div key={idx}>
                       <h3 className="main res-item">{el.school}, </h3><span className="res-item">{el.location} -</span>
                       <span className="position">{el.degree} </span>
                       <FaTimes className={this.state.hidden ? 'hidden':'deleteSkill'} onClick={this.delete_newEdu} />
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
