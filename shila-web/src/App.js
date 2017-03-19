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
            <h1 className="logo tc ttu">Shila</h1>
              <Link to="/session/add">
                <div className="nav-add" style={addBtnStyle} ></div>
              </Link>
          </nav>
          <Route exact path="/" component={Home}/>
          <Route path="/practice/add" component={AddPractice}/>
          <Route path="/session/add" component={AddSession}/>  
          </div>       
        </BrowserRouter>
    );
  }
}

export default App
