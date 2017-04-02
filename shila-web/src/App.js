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
  ShowDay
} from './pages'
import { Nav } from './components'

var addBtnStyle = {
  background: `url('./add-btn.png') no-repeat center center`,
  height: 13,
  width: 13,
  backgroundSize: '13px 13px',
  position: 'absolute',
  top: 17,
  right: 21
}

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <div className="w-80 center main">
              <Route exact path="/" component={Home}/>
              <Route path="/practice/add/" component={AddPractice}/>
              <Route path="/session/add/:name" component={AddSession}/> 
              <Route path="/day/show/:date" component={ShowDay}/> 
            </div> 
          </div>       
        </BrowserRouter>
    );
  }
}

export default App
