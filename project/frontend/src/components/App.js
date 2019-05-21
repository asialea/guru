import React, { Component } from 'react';
import {connect, Provider} from "react-redux";
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {auth,aboutUser,education,work,skills,interests} from "../actions";
import  guruApp from "../reducers"
import Home from "./views/Home";
import NotFound from "./views/NotFound"
import About from "./views/About"
import AboutView from "./views/AboutView"

let store = createStore(guruApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

  componentDidMount() {
    this.props.loadUser();
    this.props.fetchAboutUser();
    localStorage.setItem('isAuthenticated','true');
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading || this.props.aboutUser.isLoading) {
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
          <Route component={NotFound} />
         </Switch>
      </BrowserRouter>

    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    aboutUser: state.aboutUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(auth.loadUser()),
    fetchAboutUser: () => dispatch(aboutUser.fetchAboutUser()),
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
