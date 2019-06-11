import React, { Component } from 'react';
import {connect, Provider} from "react-redux";
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {auth} from "../actions";
import  guruApp from "../reducers"
import Home from "./views/Home";
import NotFound from "./views/NotFound"
import About from "./views/About"
import AboutView from "./views/AboutView"
import Connect from "./views/Connect"
import Forum from "./views/Forum"
import Category from "./views/Category"
import Topic from "./views/Topic"
import UserSettings from "./views/UserSettings"


let store = createStore(guruApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

  componentDidMount() {
    this.props.loadUser();
    localStorage.setItem('isAuthenticated','true');
  }

 PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading ) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }

  render(){

  let {PrivateRoute} = this;

    return(

      <BrowserRouter>
         <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/about" component={About}/>
          <PrivateRoute path="/about/:username" component={AboutView} />
          <PrivateRoute path="/connect" component={Connect} />
          <PrivateRoute path="/settings" component={UserSettings} />
          <PrivateRoute exact path="/forums" component={Forum} />
          <PrivateRoute exact path="/forums/:category_id" component={Category} />
          <PrivateRoute path="/forums/:category_id/:topic_id" component={Topic} />
          <Route component={NotFound} />
         </Switch>
      </BrowserRouter>

    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(auth.loadUser()),
  }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}
