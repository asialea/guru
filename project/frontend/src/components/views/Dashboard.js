import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";

class Dashboard extends Component{

  render(){

    return(

      <div>

      <h1>{this.props.user.username}Dashboard</h1>
      </div>

    );
  }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(Dashboard);
