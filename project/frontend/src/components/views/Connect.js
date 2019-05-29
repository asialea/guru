import React, { Component } from 'react';
import Navbar from './Navbar';
import '../static/Connect.css';
import {Link} from 'react-router-dom';
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
    user_query:null
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
        <Navbar/>
      </header>
    <div className="flex-box">
      <div className="connect-body">

          <div id="search-bar"><input ref="query" type="text" placeholder="Search..." onChange={e =>this.setState({query:e.target.value})}/>
          <FaSearch onClick={this.search.bind(this)}id="search-icon"/><button id="reset" className={!this.state.hidden ? 'hidden':'submit'}
          onClick={this.reset.bind(this)}>RESET</button></div>

          <div className="search-label"><span className={!this.state.hidden ? 'hidden':'reset'}>RESULTS FOR: "{this.state.query}"</span>
          <span className={this.state.hidden ? 'hidden':'reset'}>ALL USERS</span></div>


          <SearchResult users={this.state.users} hidden={this.state.hidden}/>

          <Tabs>
            <TabLink className={!this.state.hidden ? 'hidden':'tablink'} to="tab1" default>All ({this.state.user_query ? this.state.user_query.all.length :null})</TabLink>
            <TabLink className={!this.state.hidden ? 'hidden':'tablink'} to="tab2">People ({this.state.user_query ? this.state.user_query.name.length :null})</TabLink>
            <TabLink className={!this.state.hidden ? 'hidden':'tablink'} to="tab3">Company ({this.state.user_query ? this.state.user_query.company.length :null})</TabLink>
            <TabLink className={!this.state.hidden ? 'hidden':'tablink'} to="tab4">Location ({this.state.user_query ? this.state.user_query.location.length :null})</TabLink>
            <TabLink className={!this.state.hidden ? 'hidden':'tablink'} to="tab5">Skill ({this.state.user_query ? this.state.user_query.skill.length :null})</TabLink>
            <TabLink className={!this.state.hidden ? 'hidden':'tablink'} to="tab6">Interest ({this.state.user_query ? this.state.user_query.interest.length :null})</TabLink>
            <TabLink className={!this.state.hidden ? 'hidden':'tablink'} to="tab7">School ({this.state.user_query ? this.state.user_query.school.length :null})</TabLink>

            <TabContent className={!this.state.hidden ? 'hidden':''} for="tab1">
              <SearchResult users={this.state.user_query ? this.state.user_query.all:[]} hidden={!this.state.hidden}/>
            </TabContent>

            <TabContent className={!this.state.hidden ? 'hidden':''} for="tab2">
              <SearchResult users={this.state.user_query ? this.state.user_query.name:[]} hidden={!this.state.hidden}/>
            </TabContent>

            <TabContent className={!this.state.hidden ? 'hidden':''} for="tab3">
              <SearchResult users={this.state.user_query ? this.state.user_query.company:[]} hidden={!this.state.hidden}/>
            </TabContent>

            <TabContent className={!this.state.hidden ? 'hidden':''} for="tab4">
              <SearchResult users={this.state.user_query ? this.state.user_query.location:[]} hidden={!this.state.hidden}/>
            </TabContent>

            <TabContent className={!this.state.hidden ? 'hidden':''} for="tab5">
              <SearchResult users={this.state.user_query ? this.state.user_query.skill:[]} hidden={!this.state.hidden}/>
            </TabContent>

            <TabContent className={!this.state.hidden ? 'hidden':''} for="tab6">
              <SearchResult users={this.state.user_query ? this.state.user_query.interest:[]} hidden={!this.state.hidden}/>
            </TabContent>

            <TabContent className={!this.state.hidden ? 'hidden':''} for="tab7">
              <SearchResult users={this.state.user_query ? this.state.user_query.school:[]} hidden={!this.state.hidden}/>
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
