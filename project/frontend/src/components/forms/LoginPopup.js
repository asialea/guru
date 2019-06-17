import React from 'react';
import '../static/Home.css';
import {FaTimes} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import {connect} from "react-redux";
import {auth} from "../../actions";


class LoginPopup extends React.Component {
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

      <div className='popup'>
        <div className='popup_inner login-popup'>
          <IconButton onClick={this.props.closePopup}><FaTimes/></IconButton>
          <h1>Login</h1>
          <form id="">
            <div className="row">
              <div className="inputdiv col-12">
                <input className = ""  type="text"
                 placeholder="Username" onChange={e => this.setState({username: e.target.value})}/>
              </div>
              <div className="inputdiv col-12">
                <input className = "login-popup"  type="password"
                 placeholder="Password" onChange={e => this.setState({password: e.target.value})}/>
              </div>
              <div className="inputdiv col-12">
                <button className ='submit' onClick={this.onSubmit} >Login</button>
              </div>
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
  }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(LoginPopup);
