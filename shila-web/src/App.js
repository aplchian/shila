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
          <nav className="nav-bar">
              <Link style={{ textDecoration: 'none' }} to="/">
                <h1 className="logo tc ttu no-underline">Shila</h1>
              </Link>
              <Link to="/practice/add">
                <div className="nav-add pointer z-max" style={addBtnStyle} ></div>
              </Link>
          </nav>
            <div className="w-80 center main">
              <Route exact path="/" component={Home}/>
              <Route path="/practice/add" component={AddPractice}/>
              <Route path="/session/add/:type" component={AddSession}/> 
            </div> 
          </div>       
        </BrowserRouter>
    );
  }
}

export default App
