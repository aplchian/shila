import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'
import uuid from 'uuid'
import { assoc } from 'ramda'
import { createSession } from '../services'


module.exports = React.createClass({

  getInitialState(){
    const { match } = this.props
    return({
      _id: `session_${uuid.v4()}`,
      name: match.params.type,
      time: moment().unix(),
      type: 'session'
    })
  },
  handleChange(path){
    return e => {
      const { state } = this
      const newState = assoc(path,Number(e.target.value),state)
      this.setState(newState)
    }
  },
  onSave(e){
    e.preventDefault()
    
    createSession(this.state)
      .then(res => this.setState({success: true}))
      .catch(err => console.log('err',err))
  },
  render(){
    const { match } = this.props
    console.log('state',this.state)
    return (
      <div>
        {
          this.state.success
            ? <Redirect to="/"/>
            : null
        }
        <h1 className="tc page-header">Add New <span className="ttc">{match.params.type}</span> Session</h1>
        <form>
          <label className="db form-label">Count or Minutes</label>
          <input onChange={this.handleChange('amount')} className="db w-100 input pa1" type="number"/>
          <button onClick={this.onSave} className="button mt3 pointer">Submit</button>
        </form>
      </div>
    )
  }
})