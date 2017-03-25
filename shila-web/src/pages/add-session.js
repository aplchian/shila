import React from 'react'
import { Link } from 'react-router-dom'


module.exports = React.createClass({
  getInitialState(){
    return({

    })
  },
  render(){
    const { match } = this.props
    return (
      <div>
        <h1 className="tc page-header">Add New <span className="ttc">{match.params.type}</span> Session</h1>
        <form>
          <label className="db form-label">Count or Minutes</label>
          <input className="db w-100 input pa1" type="text"/>
          <button className="button mt3 pointer">Submit</button>
        </form>
      </div>
    )
  }
})