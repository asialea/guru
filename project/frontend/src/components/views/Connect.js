import React, { Component } from 'react';
import Navbar from './Navbar';
import '../static/Connect.css';
import {connect} from "react-redux";
import {FaSearch} from 'react-icons/fa';
import {Tabs,TabLink,TabContent} from 'react-tabs-redux'
import {headers} from '../forms/global.js'
import SearchResult from './SearchResult'


class Connect extends Component{

  state ={
    users:[],
    query:null,
    hidden:false,
    user_query:null,
    type:['MR','ME'],
  }

  componentWillMount(){
    fetch(`/api/users/`)
      .then(response => { return response.json();}).then(responseData => {return responseData;})
      .then (json =>this.setState({users: json}))
      .catch(err => {console.log("fetch error" + err);
       });
  }

  search = (e) =>{
    e.preventDefault();
    this.refs.query.value="";
    let query = this.state.query
    let body = JSON.stringify({query});
    headers["Authorization"] = `Token ${this.props.token}`;
    fetch("/api/filter/", {headers,body,method:"POST"}).then(res => {return res.json();})
      .then(json =>{this.setState({user_query:json})}).then(this.hidden_cb)
      .catch(err => {console.log("fetch error" + err)})
  }

  hidden_cb = (e) =>{
    this.setState({hidden:true});
  }

  reset = (e) =>{
    e.preventDefault();
    this.setState({hidden:false},);
    this.setState({query:null})
    this.refs.query.value="";
  }

  render(){
    return(
    <div id="connect">
      <header>
        <Navbar history={this.props.history}/>
      </header>
      <div className="flex-box">
        <div className="connect-body">
          <div id="search-bar">
          <form onSubmit={this.search.bind(this)}>
            <FaSearch id="search-icon"/>
            <input ref="query" type="text" placeholder="Search..." onChange={e =>this.setState({query:e.target.value})}/>
          </form>

           <select placeholder="Account Type"  onChange={e => this.setState({type: e.target.value})}>
             <option value="['MR','ME']">Filter</option>
             <option value="['MR','ME']">All</option>
             <option value="ME">Mentee</option>
             <option value="MR">Mentor</option>
           </select>
          </div>

          <div className="search-label">
          <span className={this.state.hidden ? 'hidden':'reset'}>ALL {this.state.users.length} USERS</span>
            <button id="reset" className={!this.state.hidden ? 'hidden':'inline-block'}onClick={this.reset.bind(this)}>RESET</button>
            <span className={!this.state.hidden ? 'hidden':'reset'}>
            ({this.state.user_query ? this.state.user_query.all.length :null})  RESULTS FOR: "{this.state.query}"
            </span>
          </div>


          <SearchResult users={this.state.users} hidden={this.state.hidden} type={this.state.type}/>

          <Tabs>
            <TabLink className={!this.state.hidden ? 'hidden':'tablink'} to="tab1" default>All ({this.state.user_query ? this.state.user_query.all.length :null})</TabLink>
            <TabLink className={!this.state.hidden ? 'hidden':'tablink'} to="tab2">People ({this.state.user_query ? this.state.user_query.name.length :null})</TabLink>
            <TabLink className={!this.state.hidden ? 'hidden':'tablink'} to="tab3">Company ({this.state.user_query ? this.state.user_query.company.length :null})</TabLink>
            <TabLink className={!this.state.hidden ? 'hidden':'tablink'} to="tab4">Location ({this.state.user_query ? this.state.user_query.location.length :null})</TabLink>
            <TabLink className={!this.state.hidden ? 'hidden':'tablink'} to="tab5">Skill ({this.state.user_query ? this.state.user_query.skill.length :null})</TabLink>
            <TabLink className={!this.state.hidden ? 'hidden':'tablink'} to="tab6">Interest ({this.state.user_query ? this.state.user_query.interest.length :null})</TabLink>
            <TabLink className={!this.state.hidden ? 'hidden':'tablink'} to="tab7">School ({this.state.user_query ? this.state.user_query.school.length :null})</TabLink>

            <TabContent className={!this.state.hidden ? 'hidden':''} for="tab1">
              <SearchResult users={this.state.user_query ? this.state.user_query.all:[]} hidden={!this.state.hidden} type={this.state.type}/>
            </TabContent>

            <TabContent className={!this.state.hidden ? 'hidden':''} for="tab2">
              <SearchResult users={this.state.user_query ? this.state.user_query.name:[]} hidden={!this.state.hidden} type={this.state.type}/>
            </TabContent>

            <TabContent className={!this.state.hidden ? 'hidden':''} for="tab3">
              <SearchResult users={this.state.user_query ? this.state.user_query.company:[]} hidden={!this.state.hidden} type={this.state.type}/>
            </TabContent>

            <TabContent className={!this.state.hidden ? 'hidden':''} for="tab4">
              <SearchResult users={this.state.user_query ? this.state.user_query.location:[]} hidden={!this.state.hidden} type={this.state.type}/>
            </TabContent>

            <TabContent className={!this.state.hidden ? 'hidden':''} for="tab5">
              <SearchResult users={this.state.user_query ? this.state.user_query.skill:[]} hidden={!this.state.hidden} type={this.state.type}/>
            </TabContent>

            <TabContent className={!this.state.hidden ? 'hidden':''} for="tab6">
              <SearchResult users={this.state.user_query ? this.state.user_query.interest:[]} hidden={!this.state.hidden} type={this.state.type}/>
            </TabContent>

            <TabContent className={!this.state.hidden ? 'hidden':''} for="tab7">
              <SearchResult users={this.state.user_query ? this.state.user_query.school:[]} hidden={!this.state.hidden} type={this.state.type}/>
            </TabContent>
          </Tabs>
        </div>
      </div>
    </div>
    );
  }
}


const mapStateToProps = state => {
    return {
      token:state.auth.token,
      user: state.auth.user,
    }
}


export default connect(mapStateToProps)(Connect);
