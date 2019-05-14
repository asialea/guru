import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth,editAbout} from "../../actions";
import Navbar from './Navbar';
import '../static/About.css';
import {forms,buttons} from 'cirrus-ui';
import IconButton from '@material-ui/core/IconButton';
import { FaPencilAlt} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import Experience from '../forms/Experience'


class About extends Component{
  constructor() {
    super()
    this.state = {
      work:{},
    }
  }

  componentDidMount(){
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }

    let headers = {
      'Content-Type': 'application/json',
    };

    headers["Authorization"] = `Token ${this.props.token}`;

    fetch(`/api/work/`, {headers,})
      .then(response => { return response.json();}).then(responseData => {return responseData; console.log(responseData);})
     .then (json =>this.setState({work: json})).catch(err => {
           console.log("fetch error" + err);
       });
  }

  render(){
    const work = [this.state.work];
    return(
    <div>
      <header>
        <Navbar/>
      </header>
      <div className="flex-box">
        <div id="body">
          <div id="pro-pic"><p>Update Profile Pic</p></div>
          <table className="table" id="about-me">
            <caption>Personal Info<Link to="/about/update"><IconButton id="about-edit" ><FaPencilAlt/></IconButton></Link></caption>
            <thead>
            </thead>
            <tbody>
              <tr><th>Username</th><td>{this.props.user.username}</td></tr>
              <tr><th>Email</th><td>{this.props.user.email}</td></tr>
              <tr><th>Github</th><td>{this.props.user.github}</td></tr>
              <tr><th>LinkedIn</th><td>{this.props.user.linkedin}</td></tr>
              <tr><th>Twitter</th><td>{this.props.user.twitter}</td></tr>
              <tr><th>User</th><td>{this.props.user.type}</td></tr>
            </tbody>
          </table>
          <section id="bio">
            <h1>{this.props.user.first_name} {this.props.user.last_name}</h1>
            <p>{this.props.user.bio}t vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas as  </p>
          </section>

          <section id="resume">
            <article>
             <button className="accordion btn-animated"><h2>Experience</h2></button>
             <div className="form">
             <Experience/>
             </div>
     //         <ul>
     //         {rows.map((row) => {
     //         return <ObjectRow key={row.uniqueId} />;
     //     })}
     // </ul>
            </article>

            <article>
              <button className="accordion btn-animated"><h2>Education</h2></button>
              <div className="form">
              </div>
              <p></p>
            </article>

            <article>
              <button className="accordion btn-animated"><h2>Skills</h2></button>
              <div className="form">
              </div>
              <p></p>
            </article>

            <article>
              <button className="accordion btn-animated"><h2>Interests</h2></button>
              <div className="panel">
              </div>
              <p></p>
            </article>
          </section>
        </div>
      </div>
      <div>{this.props.children}</div>
    </div>
    );
  }
}
// do this so we can have access to the global state in our component
const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    }
    };


export default connect(mapStateToProps,mapDispatchToProps)(About);
