import React, { Component } from 'react';
import {connect} from "react-redux";
import '../static/Home.css';
import Comment from './Comment';
import '../static/Forum.css';
import TextareaAutosize from 'react-textarea-autosize';
import {headers} from '../forms/global.js'

class Comments extends Component{

  render(){
    var meta = this.props.meta;

    return(
      <div>
       {
         this.props.comments.map(function(comment){
         return <Comment key={comment.id} meta={meta} comment={comment} />

       })
  }
  </div>
);
}

}


export default (Comments);
