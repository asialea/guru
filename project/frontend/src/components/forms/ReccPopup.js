import React from 'react';
import '../static/Home.css';
import {FaTimes} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';

class ReccPopup extends React.Component {

  state:{
    recc:null,
  }

  render() {
return (
  <div className='popup'>
    <div className='popup_inner'>
      <p>{this.props.text}</p>
      <IconButton onClick={this.props.closePopup}><FaTimes/></IconButton>
      <textarea onChange={e => this.setState({recc:e.target.value})} maxLength="500" placeholder="Write a Reccomendation"></textarea>
      <button className="submit">Submit</button>

    </div>
  </div>
    );
    }
  }

export default ReccPopup;
