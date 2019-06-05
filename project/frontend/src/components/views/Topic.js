import React, { Component } from 'react';
import {connect} from "react-redux";
import '../static/Home.css';
import Navbar from './Navbar';
import '../static/Forum.css';
import TextareaAutosize from 'react-textarea-autosize';
import {headers} from '../forms/global.js'
import Comments from './Comments';


class Topic extends Component{

    state = {
      posts:[],
      topic:"",
      post:"",
      reply:"",
      meta:null,
    }

    submitPost = (e) =>{
      e.preventDefault();
      this.newPost(this.props.match.params.topic_id,this.props.match.params.category_id,this.state.post,null,this.props.user.id)
      .then(this.fetchPosts())
    }

    submitReply =(id) =>{
      this.newPost(this.props.match.params.topic_id,this.props.match.params.category_id,
        this.state.reply,id,this.props.user.id)
    }

    newPost(topic,category,text,reply_to,user_id){
      let body = JSON.stringify({topic,category,text,reply_to,user_id});
      headers["Authorization"] = `Token ${this.props.token}`;
      return fetch(`/api/post/${this.props.match.params.topic_id}/`, {headers,body,method:"POST"}).then(res => {return res.json();})
        .then(json => console.log(json))
        .catch(err => {console.log("fetch error" + err)})
    }

    fetchPosts(){
      fetch(`/api/post/${this.props.match.params.topic_id}/`)
        .then(response => { return response.json();}).then(responseData => {return responseData;})
        .then (json => {this.setState({posts: json.data}); this.setState({topic:json.topic}); this.setState({meta:json.meta});})
        .catch(err => {console.log("fetch error" + err);
         });
    }


    componentWillMount(){
      this.fetchPosts()
    }

    // {this.state.posts.map((el,idx) => {
    //       return <div className="post" key={idx}>
    //             <div className="post-avi" style = {{backgroundImage: `url()`}}></div>
    //             <div className="text">
    //               <p> <Link to={"/about/"}>@{}</Link></p>
    //               <p>{el.text}</p>
    //               <TextareaAutosize id="new-post" onChange={e => this.setState({reply: e.target.value})} maxLength="500" minRows={1} maxRows={6}
    //                placeholder="Reply"/>
    //               <p onClick={e =>this.submitReply(el.id)} className="">Reply</p>
    //             </div>
    //
    //       </div>
    //   })}


  render(){
    console.log(this.state.post)
    let meta = this.state.meta;
    return(
    <div id="topic">
      <header>
        <Navbar/>
      </header>
      <div className="flex-box">
        <div className="forum-body">
            <div id="post-list">
              <h1 className="forum-h1">{this.state.topic}</h1>
              <div className="post">
              <div className="post-avi" style = {meta ? {backgroundImage: `url(${meta[this.props.user.id]['avi_path']})`} : {}}></div>
              <div className="text">
                <TextareaAutosize id="new-post" onChange={e => this.setState({post: e.target.value})} maxLength="500" minRows={1} maxRows={6}
                 placeholder="Create a post..."/>
                <button onClick={this.submitPost} className="post-submit">Post</button> <button className="post-submit">Add Tag</button>
              </div>
              </div>
              <div>
                <Comments comments={this.state.posts} meta={this.state.meta} />
              </div>
            </div>

        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
    return {
      user: state.auth.user,
      token:state.auth.token,
    }
}

export default connect(mapStateToProps)(Topic);
