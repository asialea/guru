import React, { Component } from 'react';
import {forms,buttons,layout,header} from 'cirrus-ui';
import '../static/Home.css';
import Register from './Register';
import {Link,Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {auth} from "../../actions";


class Home extends Component {

    state = {
   username: "",
   password: "",
  }

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.username, this.state.password);
    this.props.login(this.state.username, this.state.password);
  }


  render () {

    if (this.props.isAuthenticated) {
      localStorage.setItem('isAuthenticated','true');
      return <Redirect to="/about" />;
    }
      return (

<div id="home">

      <div className="header header-fill header-fixed">
        <div className="header-brand">
          <div className="nav-item no-hover">
              <h1 className="title">Guru</h1>

          </div>
        </div>
        <div className="header-nav">
          <div className="nav-right" >

          <form id="login-form">

              <input className = "login-input"  type="text"
               placeholder="Username" onChange={e => this.setState({username: e.target.value})}/>


              <input className = "login-input"  type="password"
               placeholder="Password" onChange={e => this.setState({password: e.target.value})}/>

              <button className ='submit' onClick={this.onSubmit} id='login-submit'>Login</button>

            {this.props.errors.length > 0 && (
              <ul>
                {this.props.errors.map(error => (
                  <li key={error.field}>{error.message}</li>
                ))}
              </ul>
            )}

          </form>

          </div>
        </div>
      </div>

        <div className= "row">
             <div id = "register-div">
                <p id = "banner"> Join the tech community </p>
                <p id = "banner2"> Get started - it's free </p>
                <Register/>
                <p>
                  <Link to="/contact">Click Here</Link> to contact us!
                </p>
            </div>

        </div>

         <div>{this.props.children}</div>
</div>

      );
   }
}


const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };

}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(auth.login(username, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
