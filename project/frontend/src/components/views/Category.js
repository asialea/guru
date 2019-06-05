import React, { Component } from 'react';
import {connect} from "react-redux";
import '../static/Home.css';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import {FaComments,FaPlus} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import {headers} from '../forms/global.js'


class Category extends Component{


      state = {
        topics:[],
        category:"",
        hidden:true,
        topic:"",
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

    addTopic(created_by,category,name){
        let body = JSON.stringify({created_by,category,name});
        headers["Authorization"] = `Token ${this.props.token}`;
        fetch(`/api/topic/${this.props.match.params.category_id}/`, {headers,body,method:"POST"})
          .then(res => {return res.json();})
          .then(responseData => {return responseData;})
          .then(json =>{this.setState({new_skill: json},this.addTopic_cb)})
          .catch(err => {console.log("fetch error" + err)})
      }

    addTopic_cb = (e) =>{
      this.fetchTopics()
    }

    topicSubmit(e){
      e.preventDefault();
      this.addTopic(this.props.user.id,this.props.match.params.category_id,this.state.topic)
    }

    componentWillMount(){
      this.fetchTopics()
    }

    render(){
      return(
      <div id="category">
        <header>
          <Navbar/>
        </header>
        <div className="flex-box">
          <div className="forum-body">
            <div id="recent-topics">
              <h2>Popular Topics</h2>
            </div>

            <div id="topic-list">
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
