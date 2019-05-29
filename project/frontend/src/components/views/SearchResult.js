import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth} from "../../actions";
import '../static/Home.css';
import {Link} from 'react-router-dom';


class SearchResult extends Component{

  constructor() {
    super()

  }

  parse_type(type){
    return (type ==='MR' ? 'Mentor' : 'Mentee')
  }

  render(){
    return(
      <div id="users">
      {
        this.props.users.map((el,idx) => {
          if(el.id!==this.props.user.id){
            return <div  className={!this.props.hidden ? 'user-icon':'hidden'} key={idx}>
            <div>
                 <Link to={"/about/"+el.username}><img alt="profile-pic"  className="pro-pic"src={el.avi__avi_path}/>
                   <h3 className="username main res-item">@{el.username}</h3>
                 <p className="desc res-item">{this.parse_type(el.type)}</p></Link>
                 </div>
                   </div>}
            return null
        })}
      </div>
  )

}
}

const mapStateToProps = state => {
    return {
      user: state.auth.user,
    }
}

export default connect(mapStateToProps)(SearchResult);
