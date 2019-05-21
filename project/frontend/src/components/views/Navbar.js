import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";
import '../static/Home.css';
import {Link} from 'react-router-dom';
import { FaEnvelope,FaCode,FaUser,FaNewspaper,FaIdCard,FaUsers,FaSignOutAlt} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import {Redirect} from 'react-router-dom';

class Navbar extends Component{
//
//   handleLogout = e => {
//     console.log("logout");
//     this.props.logout();
//     return <Redirect to="/" />;
// }
// <Link to="/about"><IconButton>
//   <FaIdCard />
// </IconButton></Link>

  redirectAbout = e =>{
    return <Redirect to="/about" />;
  }


  componentDidMount(){
    if (this.props.isAuthenticated==="False") {
      return <Redirect to="/" />;
    }
  }

  render(){

    return(

      <div className="header header-fill header-fixed">
        <div className="header-brand">
          <div className="nav-item no-hover">
              <Link to="/dashboard"><h1 className="title">Guru</h1></Link>
          </div>
        </div>

        <div className="nav-right" >
          <div className="nav-item text-center">
              <IconButton>
                <FaEnvelope className="nav-link"/>
              </IconButton>
          </div>
          <div className="nav-item text-center">
            <IconButton>
              <FaCode className="nav-link"/>
            </IconButton>
          </div>
          <div className="nav-item text-center">
            <IconButton>
              <FaUser className="nav-link"/>
            </IconButton>
          </div>
          <div className="nav-item text-center">
            <IconButton>
              <FaNewspaper className="nav-link"/>
            </IconButton>
          </div>
          <div className="nav-item text-center">
            <IconButton>
              <FaUsers className="nav-link"/>
            </IconButton>
          </div>
          <div className="nav-item text-center">
            <Link to="/about"><IconButton>
              <FaIdCard />
            </IconButton></Link>
          </div>
          <div className="nav-item text-center">
            <IconButton onClick={this.props.logout}>
              <FaSignOutAlt className="nav-link"/>
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
