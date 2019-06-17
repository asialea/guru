import React, { Component } from 'react';
import {connect} from "react-redux";
import '../static/Home.css';
import Comments from './Comments';
import '../static/Forum.css';
import TextareaAutosize from 'react-textarea-autosize';
import {headers} from '../forms/global.js'
import {Link} from 'react-router-dom';
import {FaComment,FaTrash,FaThumbsUp} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';


class Comment extends Component{

  state = {
    meta:{},
    hidden:true,
    reply_hidden:true,
    reply:"",
    likes:[],
    liked:null,
  }

  parseDate(timestamp){
    var t = timestamp.split(/[-:T]/)
    var d = new Date(Date.UTC(t[0],t[1]-1,t[2],t[3],t[4]));
    return d.toString().slice(4,21)
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
    headers["Authorization"] = `Token ${this.props.token}`;
    fetch(`/api/post/${this.props.match.params.topic_id}/`, {headers,body,method:"DELETE"})
    .then(res => {return res.json();}).then(()=>this.props.fetchPosts())
    .catch(err => {console.log("fetch error" + err)})
  }

  getLikes(post){
    headers["Authorization"] = `Token ${this.props.token}`;
    fetch(`/api/likes/${post}`, {headers,method:"GET"})
    .then(res => {return res.json();})
    .then(json=>{this.setState({likes:json['likes']}); this.setState({liked:json['liked']})})
    .catch(err => {console.log("fetch error" + err)})
  }

  likePost(post,user_id){
    let body = JSON.stringify({post,user_id});
    fetch(`/api/likes/${post}`, {headers,body,method:"POST"})
    .then(res => {return res.json();}).then(()=>this.getLikes(this.props.comment.id))
    .catch(err => {console.log("fetch error" + err)})
  }

  unlikePost(post,user_id){
    let body = JSON.stringify({user_id});
    headers["Authorization"] = `Token ${this.props.token}`;
    fetch(`/api/likes/${post}`, {headers,body,method:"DELETE"})
    .then(res => {return res.json();}).then(()=>this.getLikes(this.props.comment.id))
    .catch(err => {console.log("fetch error" + err)})
  }

  handleLikes=(e)=>{
    e.preventDefault();
    if(!this.state.liked){
      this.likePost(this.props.comment.id, this.props.user.id)
    }else{
      this.unlikePost(this.props.comment.id, this.props.user.id)
    }
  }

  componentWillMount(){
    this.getLikes(this.props.comment.id);

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
          <p className="post-timestamp">{this.parseDate(comment.timestamp)}</p>

            <p> {meta&&meta[comment.user_id] ? <Link to={`/about/${meta[comment.user_id]['username']}`}>@{meta[comment.user_id]['username']}</Link>:null}</p>
            <p>{comment.text}</p>
            <IconButton onClick={this.handleLikes.bind(this)}><FaThumbsUp/></IconButton>
            <span>{this.state.likes.length} likes </span>
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
