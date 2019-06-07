import React, { Component } from 'react';
import {connect} from "react-redux";
import '../static/Home.css';
import Comments from './Comments';
import '../static/Forum.css';
import TextareaAutosize from 'react-textarea-autosize';
import {headers} from '../forms/global.js'
import {Link} from 'react-router-dom';
import {FaComment,FaTrash} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';


class Comment extends Component{

  state = {
    meta:{},
    hidden:true,
    reply_hidden:true,
    reply:"",
  }

  show = () =>{
    this.setState({hidden:!this.state.hidden})
  }
  showReply = (e) =>{
    this.setState({reply_hidden:!this.state.reply_hidden})
  }

  submitReply =(id) =>{
    this.props.newPost(this.props.match.params.topic_id,this.props.match.params.category_id,
      this.state.reply,id,this.props.user.id).then(this.showReply)
  }

  deletePost(id){
    let body = JSON.stringify({id});
    fetch(`/api/post/${this.props.match.params.topic_id}/`, {headers,body,method:"DELETE"})
    .then(res => {return res.json();}).then(()=>this.props.fetchPosts())
    .catch(err => {console.log("fetch error" + err)})
  }

  render(){
     var comment = this.props.comment;
     var meta = this.props.meta;
     var match = this.props.match;
    return(
      <div>
        <div className="post" >
          <div className="post-avi" style = {meta&&meta[comment.user_id] ? {backgroundImage: `url(${meta[comment.user_id]['avi_path']})`} : {}}></div>
          <div className="text">
            <p> <Link to={"/about/"}>@{meta&&meta[comment.user_id] ? meta[comment.user_id]['username']:""}</Link></p>
            <p>{comment.text}</p>
            <IconButton onClick={this.showReply}><FaComment/></IconButton>
            <IconButton onClick={e=>{e.preventDefault();this.deletePost(comment.id)}}>
              <FaTrash className={this.props.user.id !== comment.user_id ? "hidden" : ""}/>
            </IconButton>
            <TextareaAutosize  className={this.state.reply_hidden ? "hidden" : ""}id="new-post" onChange={e => this.setState({reply: e.target.value})}
             maxLength="500" minRows={1} maxRows={6}
             placeholder="Reply"/>
            <p onClick={e =>this.submitReply(comment.id)} className={this.state.reply_hidden ? "hidden" : "reply"}>Reply</p>
            <p className="view-replies" onClick={this.show}>{comment.replies ? "View "+comment.replies.length + " replies" : ""}</p>
          </div>
        </div>
        <div className={this.state.hidden ? "hidden" : "replies"}>
          <Comments fetchPosts={this.props.fetchPosts} newPost={this.props.newPost} match={match}
          meta={meta} comments={comment.replies ? comment.replies : []} />
        </div>
      </div>

    )
  }
}


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token: state.auth.token,
    }
}


export default connect(mapStateToProps)(Comment);
