import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";
import '../static/Home.css';
import {Link} from 'react-router-dom';
import {FaEnvelope,FaUser,FaNewspaper,FaIdCard,FaUsers,FaSignOutAlt} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import {Redirect} from 'react-router-dom';

class Navbar extends Component{

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
              <Link to="/about"><IconButton>
                <FaEnvelope className="nav-link"/>
              </IconButton></Link>
          </div>
          <div className="nav-item text-center">
            <Link to="/about"><IconButton>
              <FaUser className="nav-link"/>
            </IconButton></Link>
          </div>
          <div className="nav-item text-center">
            <Link to="/about"><IconButton>
              <FaNewspaper className="nav-link"/>
            </IconButton></Link>
          </div>
          <div className="nav-item text-center">
              <Link to="/connect"><IconButton>
              <FaUsers className="nav-link"/>
            </IconButton></Link>
          </div>
          <div className="nav-item text-center">
            <Link to="/about"><IconButton>
              <FaIdCard />
            </IconButton></Link>
          </div>
          <div className="nav-item text-center">
            <Link to="/"><IconButton onClick={this.props.logout}>
              <FaSignOutAlt className="nav-link"/>
            </IconButton></Link>
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
