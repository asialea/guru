import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";
import '../static/Home.css';
import {Link} from 'react-router-dom';
import {FaUser,FaNewspaper,FaIdCard,FaUsers,FaSignOutAlt,FaBars} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import {Redirect} from 'react-router-dom';


class NavLinks extends Component{

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

      <div className="dropdown">
      <IconButton className="dropbtn">
        <FaBars/>
      </IconButton>
          <div className="dropdown-content">
            <ul>
            <Link to="/settings"><IconButton>
              <FaUser/>
            </IconButton></Link>

            <Link to="/forums"><IconButton>
              <FaNewspaper />
            </IconButton></Link>

              <Link to="/connect"><IconButton>
              <FaUsers />
            </IconButton></Link>

            <Link to="/about"><IconButton>
              <FaIdCard />
            </IconButton></Link>

            <Link to="/"><IconButton onClick={this.props.logout}>
              <FaSignOutAlt/>
            </IconButton></Link>
            </ul>
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

export default connect(mapStateToProps,mapDispatchToProps)(NavLinks);
