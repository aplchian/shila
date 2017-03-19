import React from 'react'
import { Link, BrowserRouter as Router } from 'react-router-dom'


var addBtnStyle = {
  background: `url('./add-btn.png') no-repeat center center`,
  height: 13,
  width: 13,
  backgroundSize: '13px 13px',
  position: 'absolute',
  top: 17,
  right: 21
}


module.exports = Component => () => (
  <Router>
    <div>
      <nav className="nav-bar">
        <h1 className="logo tc ttu">Shila</h1>
          <Link to={`session/add`}>
            <div className="nav-add" style={addBtnStyle} ></div>
          </Link>
      </nav>
      <Component />
    </div>
  </Router>
)