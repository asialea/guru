import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Home from "./views/Home";

class App extends Component{
  render(){
    return(
      <BrowserRouter>
         <Switch>
           <Route exact path="/" component={Home} />
         </Switch>
         </BrowserRouter>
    );
  }
}

export default App;




// <DataProvider endpoint="api/users/"
//               render={data => <Table data={data} />} />
