import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Link, Switch} from "react-router-dom"
import Join from "./components/Join";
import Chat from "./components/Chat";

ReactDOM.render(
  <React.StrictMode>
      {/*<BrowserRouter>*/}
      {/*    <Switch>*/}
      {/*      <Route path='/' component={Join}/>*/}
      {/*      <Route path='/room/:id' component={Chat}/>*/}
      {/*    </Switch>*/}
      {/*</BrowserRouter>*/}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
