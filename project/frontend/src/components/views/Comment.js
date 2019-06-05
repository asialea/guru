import React, { Component } from 'react';
import {connect} from "react-redux";
import '../static/Home.css';
import Comments from './Comments';
import '../static/Forum.css';
import TextareaAutosize from 'react-textarea-autosize';
import {headers} from '../forms/global.js'
import {Link} from 'react-router-dom';

class Comment extends Component{

  state = {
    meta:{},
    hidden:true,
  }

  // <TextareaAutosize id="new-post" onChange={e => this.setState({reply: e.target.value})} maxLength="500" minRows={1} maxRows={6}
  //  placeholder="Reply"/>
  // <p onClick={e =>this.submitReply(comment.id)} className="">Reply</p>  ${meta[comment.user_id]['avi_path']}
  show = (e) =>{
    this.setState({hidden:!this.state.hidden})
  }

  render(){
     var comment = this.props.comment;
     var meta = this.props.meta;

    return(
      <div>
      <div className="post" >
            <div className="post-avi" style = {meta ? {backgroundImage: `url(${meta[comment.user_id]['avi_path']})`} : {}}></div>
            <div className="text">
              <p> <Link to={"/about/"}>@{meta ? meta[comment.user_id]['username']:""}</Link></p>
              <p>{comment.text}</p>
              <p onClick={e =>this.submitReply(comment.id)} className="reply">Reply</p>
              <p className="view-replies" onClick={this.show}>{comment.replies ? "View "+comment.replies.length + " replies" : ""}</p>
            </div>
      </div>
      <div className={this.state.hidden ? "hidden" : "replies"}>
        <Comments meta={meta} comments={comment.replies ? comment.replies : []} />
      </div>
      </div>

    )
  }
}




export default (Comment);
