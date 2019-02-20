import React, { Component } from 'react';
import {header} from 'cirrus-ui';


class LoginRegister extends Component {

  render (props) {
      return (
    
     <div className='loginregister'>
       {props.children}
     </div>

      );
   }
}

export default LoginRegister;
