import React, { Component } from 'react';
import {forms,buttons,layout,header} from 'cirrus-ui';
import '../static/Home.css';
import Register from './Register';
import {Link} from 'react-router-dom';



class Home extends Component {

  state = {
    email: "",
    password: "",
  }

  onSubmit = e => {
    e.preventDefault();
    console.error("Not implemented!!");
  }


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
          <div className="nav-right" >

          <form onSubmit={this.onSubmit} id="login-form">

              <input className = "login-input"  type="text"
               placeholder="Email"/>


              <input className = "login-input"  type="password"
               placeholder="Password"/>


            <button className ='submit' id='login-submit'>Login</button>

          </form>

          </div>
        </div>
      </div>

        <div className= 'row'>
             <div className = 'picdiv col-6 ignore-screen'>
             <h6 className='caption'> Get connected to a mentor today! Start your path to a bright future in tech</h6>
             <p>
           <Link to="/contact">Click Here</Link> to contact us!
           </p>
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

const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {};
}

export default Home;
