import React, { Component } from 'react';
import {connect} from "react-redux";
import '../static/Home.css';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import {FaComments,FaTrash,FaPlus} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import {headers} from '../forms/global.js'


class Category extends Component{

  state = {
    topics:[],
    category:"",
    hidden:true,
    topic:"",
    user_topics:[]
  }

  show = (e) =>{
    this.setState({hidden:!this.state.hidden})
  }

  fetchTopics(){
    fetch(`/api/topic/${this.props.match.params.category_id}/`)
      .then(response => { return response.json();}).then(responseData => {return responseData;})
      .then (json =>{this.setState({topics: json.data});this.setState({category:json.category})})
      .catch(err => {console.log("fetch error" + err);
       });
  }

  fetchUserTopics(){
    headers["Authorization"] = `Token ${this.props.token}`;
    fetch(`/api/user_topics/`, {headers,method:"GET"})
      .then(res => {return res.json();}).then(responseData => {return responseData;})
      .then (json =>this.setState({user_topics: json}))
      .catch(err => {console.log("fetch error" + err)})
    }

  addTopic(created_by,category,name){
      let body = JSON.stringify({created_by,category,name});
      headers["Authorization"] = `Token ${this.props.token}`;
      fetch(`/api/topic/${this.props.match.params.category_id}/`, {headers,body,method:"POST"})
        .then(res => {return res.json();}).then(responseData => {return responseData;})
        .then(this.topic_cb)
        .catch(err => {console.log("fetch error" + err)})
    }

    topic_cb = () =>{
      this.fetchTopics()
      this.fetchUserTopics()
    }

    topicSubmit(e){
      e.preventDefault();
      this.addTopic(this.props.user.id,this.props.match.params.category_id,this.state.topic)
    }

    deleteUserTopic(id){
      let body = JSON.stringify({id});
      headers["Authorization"] = `Token ${this.props.token}`;
      fetch(`/api/user_topics/`, {headers,body,method:"DELETE"})
        .then(res => {return res.json();}).then(responseData => {return responseData;})
        .then(this.topic_cb)
        .catch(err => {console.log("fetch error" + err)})
      }

    componentWillMount(){
      this.topic_cb()
    }

    render(){
      return(
      <div id="category">
        <header>
          <Navbar history={this.props.history}/>
        </header>
        <div className="flex-box">
          <div className="forum-body">
            <div id="recent-topics">
              <h2>Your Topics</h2>
              <ul>
              {
                this.state.user_topics.map((el,idx) => {
                    return[
                        <li  key={idx}>
                          <IconButton onClick={e=>{e.preventDefault();this.deleteUserTopic(el.id);} }><FaTrash/></IconButton>
                          <Link to={this.props.match.params.category_id+'/'+el.id}>{el.name}</Link>
                        </li>
                    ];
                })
              }
            </ul>
            </div>

            <div id="category-list">
              <h1 className="forum-h1">{this.state.category}</h1>
              <table className="table" id="about-me">
                <thead>
                  <tr>
                    <th><IconButton onClick={this.show} className="new-item"><FaPlus/></IconButton> Topic</th>
                    <th>Posts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input onChange={e=>this.setState({topic:e.target.value})} className={this.state.hidden ? 'hidden':'input-small'} type="text"/></td>
                    <td><button onClick={this.topicSubmit.bind(this)} className={this.state.hidden ? 'hidden':'submit'}>Add</button></td>
                  </tr>
                {
                  this.state.topics.map((el,idx) => {
                      return[
                        <tr key={idx}>
                          <td><Link to={this.props.match.params.category_id+'/'+el.id}>{el.name}</Link></td>
                          <td><FaComments/> {el.posts}</td>
                        </tr>
                      ];
                  })
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      )
    }
  }

const mapStateToProps = state => {
    return {
      token:state.auth.token,
      user: state.auth.user,
    }
}

export default connect(mapStateToProps)(Category);
