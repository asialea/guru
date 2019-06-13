import React from 'react';
import '../static/Home.css';
import {FaTimes} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';

class Popup extends React.Component {
  render() {
return (
  <div className='popup'>
    <div className='popup_inner'>
      <IconButton onClick={this.props.closePopup}><FaTimes/></IconButton>
      <p id="banner2">{this.props.text}</p>
      <button id="delete-user" className="submit" onClick={()=>{this.props.doSomething(); window.location.reload(false);}}>{this.props.action_text}</button>

    </div>
  </div>
    );
    }
  }

export default (Popup);
