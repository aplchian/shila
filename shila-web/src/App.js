import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'
import {
  Home,
  AddPractice,
  AddSession,
} from './pages'
import { Nav } from './components'


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={AddPractice}/>
            <Route path="/about" component={AddSession}/>  
          </div>       
        </BrowserRouter>
    );
  }
}

export default Nav(App)
