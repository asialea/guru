import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";
import '../static/Home.css';
import {Link} from 'react-router-dom';
import {FaUser,FaNewspaper,FaIdCard,FaUsers,FaSignOutAlt,FaArrowLeft} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import {Redirect} from 'react-router-dom';
import head from './head-color.svg'
import NavLinks from './NavLinks'

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
          <div className="nav-item text-center">
            <IconButton id="back" onClick={e=> this.props.history.goBack()}><FaArrowLeft/></IconButton>
          </div>
          <div className="nav-item no-hover">
            <Link to="/about"><h1 className="title">
            <img className="logo" src={head} alt="lotus"/>Guru</h1>
            </Link>
          </div>
        </div>
        <NavLinks/>
        <div className="nav-right" >
          <div className="nav-item text-center">
            <Link to="/settings"><IconButton>
              <FaUser/>
            </IconButton></Link>
          </div>
          <div className="nav-item text-center">
            <Link to="/forums"><IconButton>
              <FaNewspaper />
            </IconButton></Link>
          </div>
          <div className="nav-item text-center">
              <Link to="/connect"><IconButton>
              <FaUsers />
            </IconButton></Link>
          </div>
          <div className="nav-item text-center">
            <Link to="/about"><IconButton>
              <FaIdCard />
            </IconButton></Link>
          </div>
          <div className="nav-item text-center">
            <Link to="/"><IconButton onClick={this.props.logout}>
              <FaSignOutAlt/>
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
