import React, { Component } from 'react';
import {header} from 'cirrus-ui';
import {connect} from "react-redux";
import {auth} from "../../actions";

class Register extends Component {

  state = {
    username: "",
    first_name:"",
    last_name:"",
    password: "",
    type:"Mentor",

  }

  onSubmit = e => {
    e.preventDefault();
    this.props.register(this.state.first_name,this.state.last_name,this.state.username,
       this.state.password,this.state.type);
  }


  render () {

    if (this.props.isAuthenticated) {
      // return <Redirect to="/" />    eventually gonna redirect to user dashboard
      console.log("Authenticated")
    }
      return (

        <form onSubmit={this.onSubmit}>

               <div className="row ">
                 <div className="col-6">
                  <input className=""  type="text"
                   placeholder="First Name" onChange={e => this.setState({first_name: e.target.value})}/>
                 </div>
                  <div className="col-6">
                  <input className="" type="text"
                   placeholder="Last Name" onChange={e => this.setState({last_name: e.target.value})}/>
                  </div>
               </div>

               <div className = "row">
                     <div className="inputdiv col-12">
                    <input className = ""  type="email"
                     placeholder="Email" onChange={e => this.setState({username: e.target.value})}/>
                     </div>

                    <div className="inputdiv col-12">
                    <input className = ""  type="password"
                     placeholder="Password" onChange={e => this.setState({password: e.target.value})}/>
                     </div>

                     <div className="inputdiv col-12">
                    <input className = ""  type="password"
                     placeholder="Confirm Password"/>
                     </div>


                    <div className="inputdiv col-12">
                    // fix this to set the state
                       // <select className="" placeholder="Account Type"  onChange={e => this.setState({type: e.target.value})}>
                       //   <option value="Mentee">Mentee</option>
                       //   <option value="Mentor">Mentor</option>
                       // </select>
                    </div>


                    <div className="inputdiv col-12">
                    <button className = "submit" >Sign Up</button>
                    </div>
               </div>
               {this.props.errors.length > 0 && (
                 <ul>
                   {this.props.errors.map(error => (
                     <li key={error.field}>{error.message}</li>
                   ))}
                 </ul>
               )}
        </form>

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
    //CHANGED**************
    register: (username,first_name,last_name,password) => dispatch(auth.register(username,first_name,last_name,password)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);
