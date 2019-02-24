import React, { Component } from 'react';
// import ReactDOM from "react-dom";
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';

import Home from "./views/Home";
import NotFound from "./views/NotFound"
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

let store = createStore(guruApp, applyMiddleware(thunk));

class App extends Component{
  render(){
    return(
    <Provider store={store}>
      <BrowserRouter>
         <Switch>
           <Route exact path="/" component={Home} />
           <Route component={NotFound} />
         </Switch>
         </BrowserRouter>
    <Provider>
    );
  }
}

export default App;




// <DataProvider endpoint="api/users/"
//               render={data => <Table data={data} />} />
