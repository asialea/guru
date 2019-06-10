import React, { Component } from 'react';
import '../static/Home.css';
import Register from '../forms/Register';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from "../../actions";
import head from './head-color.svg'

class Home extends Component {

  state = {
   username: "",
   password: "",
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }


  render () {

    if (this.props.isAuthenticated) {
      return <Redirect to="/about" />;
    }

  return (
    <div id="home">
      <div className="header header-fill header-fixed">
        <div className="header-brand">
          <div className="nav-item no-hover">
              <h1 className="title"><img className="logo" src={head} alt="lotus"/>Guru</h1>
          </div>
        </div>
        <div className="nav-item">
        {this.props.errors.length > 0 && (
          <ul>
            {this.props.errors.map(error => (
              <li key={error.field}>{error.message}</li>
            ))}
          </ul>
        )}
        </div>

        <form id="login-form">
          <div className="form-group">
            <input className = "login-input"  type="text"
             placeholder="Username" onChange={e => this.setState({username: e.target.value})}/>
            <input className = "login-input"  type="password"
             placeholder="Password" onChange={e => this.setState({password: e.target.value})}/>
            <button className ='submit' onClick={this.onSubmit} id='login-submit'>Login</button>
          </div>
        </form>
      </div>

      <div className= "row">
        <div id = "register-div">
          <p id = "banner"> Join the tech community </p>
          <p id = "banner2"> Get started - it's free </p>
          <Register/>
        </div>
      </div>
      <div>{this.props.children}</div>
    </div>

      );
   }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.login_errors) {
    errors = Object.keys(state.auth.login_errors).map(field => {
      return {field, message: state.auth.login_errors[field]};
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
