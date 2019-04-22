import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";
import '../static/Navbar.css';
import {Link} from 'react-router-dom';
import { FaEnvelope,FaCode,FaUser,FaNewspaper,FaIdCard,FaUsers,FaSignOutAlt} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import {Redirect} from 'react-router-dom';

class Navbar extends Component{

  handleLogout = e => {
    console.log("logout");
    this.props.logout;
    return <Redirect to="/" />;
}

  render(){

    if (this.props.isAuthenticated=="False") {

      return <Redirect to="/" />;
    }

    return(

      <div className="header header-fill header-fixed">
        <div className="header-brand">
          <div className="nav-item no-hover">
              <Link to="/dashboard"><h1 className="title">Guru</h1></Link>
          </div>
        </div>
        <div className="nav-left">
          <div id="username"><p>{this.props.user.first_name}</p></div>
        </div>
        <div className="nav-right" >
          <div className="nav-item text-center">
              <IconButton>
                <FaEnvelope/>
              </IconButton>
          </div>
          <div className="nav-item text-center">
            <IconButton>
              <FaCode/>
            </IconButton>
          </div>
          <div className="nav-item text-center">
            <IconButton>
              <FaUser />
            </IconButton>
          </div>
          <div className="nav-item text-center">
            <IconButton>
              <FaNewspaper/>
            </IconButton>
          </div>
          <div className="nav-item text-center">
            <IconButton>
              <FaUsers/>
            </IconButton>
          </div>
          <div className="nav-item text-center">
            <Link to="/about"><IconButton>
              <FaIdCard />
            </IconButton></Link>
          </div>
          <div className="nav-item text-center">
            <IconButton onClick={this.props.logout}>
              <FaSignOutAlt />
            </IconButton>
          </div>

        </div>
      </div>

    );
  }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
