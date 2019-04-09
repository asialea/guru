import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";
import '../static/Navbar.css';
import {Link} from 'react-router-dom';
import { FaEnvelope,FaCode,FaUser,FaNewspaper,FaIdCard,FaUsers } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';

class Navbar extends Component{

  render(){

    return(

      <div className="header header-fill header-fixed">
        <div className="header-brand">
          <div className="nav-item no-hover">
              <Link to="/dashboard"><h1 className="title">Guru</h1></Link>
          </div>
        </div>
        <div className="nav-left">
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
        </div>
        <div className="nav-right" >
          <div className="profile-pic"></div>
          <div id="username"><p>{this.props.user.first_name}</p></div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(Navbar);
