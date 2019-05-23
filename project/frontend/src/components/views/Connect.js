import React, { Component } from 'react';
import Navbar from './Navbar';
import '../static/Connect.css';
import {Link} from 'react-router-dom';

class Connect extends Component{

  state ={
    users:[],
    aboutUsers:null,
    avis:null,
  }

  componentWillMount(){
    fetch(`/api/users/`)
      .then(response => { return response.json();}).then(responseData => {return responseData;})
     .then (json =>this.setState({users: json})).catch(err => {
           console.log("fetch error" + err);
       });

   fetch(`/api/aboutUsers/`)
     .then(response => { return response.json();}).then(responseData => {return responseData;})
    .then (json =>this.setState({aboutUsers: json})).catch(err => {
          console.log("fetch error" + err);
      });

  fetch(`/api/avis/`)
    .then(response => { return response.json();}).then(responseData => {return responseData;})
   .then (json =>this.setState({avis: json})).catch(err => {
         console.log("fetch error" + err);
     });
  }

  render(){
     const { users,aboutUsers, avis } = this.state;
    if(this.state.avis===null || this.state.aboutUser===null){
      return<div>Loading</div>
    }
    return(
    <div id="connect">
      <header>
        <Navbar/>
      </header>
    <div className="flex-box">


      <div className="connect-body">
        {

          users.map((el,idx) => {
              return <div className="user-icon" key={el.id}>
                   <img alt="profile-pic"  className="pro-pic"src={avis[idx].avi_path}/>
                     <Link to={"/about/"+el.username}><h3 className="username main res-item">@{el.username}</h3></Link>
                   <p className="desc res-item">{el.type}</p>
                     </div>
          })}

      </div>
      </div>

    </div>
    );
  }
}

export default (Connect);
