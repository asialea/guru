import React, { Component } from 'react';
import '../static/Home.css';
import Register from '../forms/Register';
import Login from '../forms/Login';
import LoginPopup from '../forms/LoginPopup';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from "../../actions";
import head from './head-color.svg'

class Home extends Component {

  state = {
   username: "",
   password: "",
  showPopup: false,
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }
  togglePopup= e => {
    e.preventDefault();
    this.setState({
     showPopup: !this.state.showPopup
    });
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

        <button id="media-login" className="submit" onClick={this.togglePopup.bind(this)}>Login</button>
        <Login/>
      </div>

      {this.state.showPopup ?
      <LoginPopup closePopup={this.togglePopup.bind(this)}/>
      :null}
        <div id="user-div">
          <Register/>
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
