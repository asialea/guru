import React, { Component } from 'react';
// import ReactDOM from "react-dom";
import {connect, Provider} from "react-redux";
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {auth} from "../actions";
import  guruApp from "../reducers"
import Home from "./views/Home";
import NotFound from "./views/NotFound"
import About from "./views/About"
import AboutForm from "./views/AboutForm"
import AboutView from "./views/AboutView"

let store = createStore(guruApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

  componentDidMount() {
    this.props.loadUser();
    localStorage.setItem('isAuthenticated','true');
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
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
          <PrivateRoute path="/about" component={About} />
          <Route path="/" component={Home} />
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
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
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
