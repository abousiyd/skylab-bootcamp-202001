import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'
import './app.sass';
import Cryptos from '../Cryptos'
import Login from "../Login";
import Register from "../Register";
import CryptoInfo from "../CryptoInfo"
import State from '../State'
import addMethodToggleToArray from '../../utils/array.prototype.toggle'
import News from '../News'
import PrivateRoute from '../PrivateRoute'

addMethodToggleToArray()
class App extends Component {


  render(){

    return( 
      <HashRouter>
          <Route  exact path='/' component={Cryptos}  />
          <Route path='/home' component={Cryptos} />
          <Route  exact path='/login' component={Login}  />
          <Route path='/register' component={Register} />

          <PrivateRoute exact path='/crypto/:crypto' component={CryptoInfo} />
          <PrivateRoute path='/state' component={State} />
          <PrivateRoute path='/news' component={News} />
      </HashRouter>

    
    );
  }

}

export default App;


