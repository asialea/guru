import React, { Component } from 'react';
import '../static/Home.css';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import '../static/Forum.css';
import {FaComments,FaComment} from 'react-icons/fa';


class Forum extends Component{

    state = {
      categories:[],
      recent_topics:[],
    }

  componentWillMount(){
    fetch(`/api/category/`)
      .then(response => { return response.json();}).then(responseData => {return responseData;})
      .then (json =>this.setState({categories: json}))
      .catch(err => {console.log("fetch error" + err);
       });

     fetch(`/api/recent_topics/`)
       .then(response => { return response.json();}).then(responseData => {return responseData;})
       .then (json =>this.setState({recent_topics: json}))
       .catch(err => {console.log("fetch error" + err);
        });
  }

  render(){
    return(
    <div id="forum">
      <header>
        <Navbar history={this.props.history}/>
      </header>
      <div className="flex-box">
        <div className="forum-body">
          <div id="recent-topics">
            <h2>Recent Topics</h2>
            <div>
              <ul>
              {
                this.state.recent_topics.map((el,idx) => {
                    return[
                        <li  key={idx}><Link to={'forums/'+el.category+'/'+el.id}>{el.name}</Link></li>
                    ];
                })
              }
            </ul>
            </div>
          </div>
          <div id="category-list">
            <h1 className="forum-h1">Forums</h1>
            <table className="table">
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


export default (Forum);
