import React, { Component } from 'react';
import {header} from 'cirrus-ui';


class Register extends Component {

  render () {
      return (

        <form>

               <div className="row ">
                 <div className="col-6">
                  <input className=""  type="text"
                   placeholder="First Name"/>
                 </div>
                  <div className="col-6">
                  <input className="" type="text"
                   placeholder="Last Name"/>
                  </div>
               </div>

               <div className = "row">
                     <div className="inputdiv col-12">
                    <input className = ""  type="text"
                     placeholder="Email"/>
                     </div>

                    <div className="inputdiv col-12">
                    <input className = ""  type="password"
                     placeholder="Password"/>
                     </div>

                     <div className="inputdiv col-12">
                    <input className = ""  type="password"
                     placeholder="Confirm Password"/>
                     </div>


                    <div className="inputdiv col-12">
                     <select className="" placeholder="Account Type"><option value="Mentor">Mentee</option>
                     <option value="Mentor">Mentor</option></select>
                     </div>


                    <div className="inputdiv col-12">
                    <button className = "submit" >Sign Up</button>
                    </div>
               </div>
        </form>

      );
   }
}

export default Register;
