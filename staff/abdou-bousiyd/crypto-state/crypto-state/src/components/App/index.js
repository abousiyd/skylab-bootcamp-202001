import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'
import './app.sass';
import Home from '../Home'
import Login from "../Login";
import Register from "../Register";
import CryptoInfo from "../CryptoInfo"
import State from '../State'
import addMethodToggleToArray from '../../utils/array.prototype.toggle'
import News from '../News'
import PrivateRoute from '../PrivateRoute'
import Profile from '../Profile'

addMethodToggleToArray()
class App extends Component {


  render(){

    return( 
      <HashRouter>
          <Route  exact path='/' component={Home}  />
          <Route path='/home' component={Home} />
          <Route  exact path='/login' component={Login}  />
          <Route path='/register' component={Register} />
          <PrivateRoute exact path='/crypto/:crypto' component={CryptoInfo} />
          <PrivateRoute path='/state' component={State} />
          <PrivateRoute path='/news' component={News} />
          <PrivateRoute path='/profile' component={Profile} />
      </HashRouter>

    
    );
  }

}

export default App;


