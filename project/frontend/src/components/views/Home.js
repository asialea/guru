import React, { Component } from 'react';
import {forms,buttons,layout,header} from 'cirrus-ui';
import '../static/Home.css';
import Register from './Register';



class Home extends Component {

  render () {
      return (
<div>

      <div className="header header-fill header-fixed">
        <div className="header-brand">
          <div className="nav-item no-hover">
              <h6 className="title">Guru</h6>

          </div>
        </div>
        <div className="header-nav">
          <div className="nav-right">

            <div className="nav-item no-hover">
              <input className = ""  type="text"
               placeholder="Email"/>
            </div>
            <div className="nav-item no-hover">
              <input className = ""  type="password"
               placeholder="Password"/>
            </div>
            <div className="nav-item no-hover">
            <button className = "" id='submit'>Login</button>
            </div>
          </div>
        </div>
      </div>

        <div className= 'row'>
             <div className = 'picdiv col-6 ignore-screen'>
             <h6 className='caption'>Get connected to a mentor today! Start your path to a bright future in tech</h6>
             <img src="../static/coding.jpg" alt="" height="450" width="500"/>

             </div>

            <div className = 'formdiv col-6 ignore-screen'>
              <h1>Sign Up</h1>
              <Register/>

            </div>
        </div>
         <div>{this.props.children}</div>
</div>



      );
   }
}

export default Home;
