import React, { Component } from 'react';
import '../static/Home.css';
import Comment from './Comment';
import '../static/Forum.css';

class Comments extends Component{

  render(){
    return(
      <div>
       {
         this.props.comments.map(function(comment){
         return <Comment fetchPosts={this.props.fetchPosts} newPost={this.props.newPost} match={this.props.match}
         key={comment.id} meta={this.props.meta} comment={comment} />

       },this)
  }
  </div>
);
}

}


export default (Comments);
