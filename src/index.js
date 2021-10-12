import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat";
import Main from "./pages/Main";
import Room from "./pages/Room";

ReactDOM.render(
    <React.StrictMode>
        <Router basename='/chat'>
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path='/room/:id' component={Chat}/>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
