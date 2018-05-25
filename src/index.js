import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap

// Containers
import Full from './containers/Full/'

// Login
import Login from './views/Login/'

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route exact path="/" name="Login Page" component={Login}/>
      <Route path="/dashboard" name="Home" component={Full}/>
    </Switch>
  </HashRouter>
), document.getElementById('root'));
