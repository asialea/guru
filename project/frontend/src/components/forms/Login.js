import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";
import '../static/Home.css';


class Login extends Component {

    state = {
     username: "",
     password: "",
    }

    onSubmit = e => {
      e.preventDefault();
      this.props.login(this.state.username, this.state.password);
    }

  render () {
      return (

        <form id="login-form">
          <div className="form-group">
            <input className = "login-input"  type="text"
             placeholder="Username" onChange={e => this.setState({username: e.target.value})}/>
            <input className = "login-input"  type="password"
             placeholder="Password" onChange={e => this.setState({password: e.target.value})}/>
            <button className ='submit' onClick={this.onSubmit} id='login-submit'>Login</button>
          </div>
          <div id="errors" className="">
          {this.props.errors.length > 0 && (
            <ul>
              {this.props.errors.map(error => (
                <li key={error.field}>{error.message}</li>
              ))}
            </ul>
          )}
          </div>
        </form>
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
}
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
