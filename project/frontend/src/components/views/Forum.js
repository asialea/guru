import React, { Component } from 'react';
import {connect} from "react-redux";
import '../static/Home.css';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import '../static/Forum.css';
import {FaComments,FaComment} from 'react-icons/fa';


class Forum extends Component{

    state = {
      categories:[],
    }

  componentWillMount(){
    fetch(`/api/category/`)
      .then(response => { return response.json();}).then(responseData => {return responseData;})
      .then (json =>this.setState({categories: json}))
      .catch(err => {console.log("fetch error" + err);
       });
  }

  render(){
    return(
    <div id="forum">
      <header>
        <Navbar/>
      </header>
      <div className="flex-box">
        <div className="forum-body">
          <div id="recent-topics">
            <h2>Recent Topics</h2>
            <div>
            </div>
          </div>

          <div id="category-list">
            <h1 className="forum-h1">Forums</h1>
            <table className="table" id="about-me">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Topics</th>
                  <th>Posts</th>
                </tr>
              </thead>
              <tbody>
              {this.state.categories.map(el => {
                    return[
                      <tr key={el.id}>
                        <td><Link to={"forums/"+el.id} >{el.name}</Link></td>
                        <td><FaComment/> {el.topics}</td>
                        <td><FaComments/> {el.posts}</td><
                      /tr>
                    ];
                })}
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
      user: state.auth.user,
    }
}

export default connect(mapStateToProps)(Forum);
