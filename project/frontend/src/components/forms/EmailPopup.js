import React from 'react';
import '../static/Home.css';
import {FaTimes} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import {connect} from "react-redux";

class EmailPopup extends React.Component {

  state:{
    text:null,
    rating:null,
  }


  render() {
return (
  <div className='popup'>
    <div className='popup_inner'>
      <IconButton onClick={this.props.closePopup}><FaTimes/></IconButton>
      <p id="banner2">{this.props.text}  </p>
      <textarea onChange={e => this.setState({text:e.target.value})} maxLength="500" placeholder="Your message here" required></textarea>
      <button onClick={(e)=>{this.props.closePopup(e);}} className="submit">Submit</button>
    </div>
  </div>
    );
    }
  }
  const mapStateToProps = state => {
      return {
          user: state.auth.user,
          token: state.auth.token,
      }
  }



export default connect(mapStateToProps)(EmailPopup);
