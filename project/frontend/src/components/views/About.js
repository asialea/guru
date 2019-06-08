import React, { Component } from 'react';
import {connect} from "react-redux";
import Navbar from './Navbar';
import '../static/About.css';
import Skills from '../forms/Skills'
import Interests from '../forms/Interests'
import Experience from '../forms/Experience'
import Education from '../forms/Education'
import AboutUser from '../forms/AboutUser'

class About extends Component{

  render(){
    return(
    <div className="body" id="about">
      <header>
        <Navbar history={this.props.history}/>
      </header>
      <div className="flex-box">
        <div className="about-body">

          <section id="aboutUser">
            <AboutUser/>
          </section>

          <section id="resume">

            <article>
              <Experience/>
            </article>

            <article>
              <Education/>
            </article>

            <article>
              <Skills/>
            </article>

            <article>
              <Interests/>
            </article>
          </section>
        </div>
      </div>
      <div>{this.props.children}</div>
    </div>
    );
  }
}
const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token: state.auth.token,
    }
}



export default connect(mapStateToProps)(About);
