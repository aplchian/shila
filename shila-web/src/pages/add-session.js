import React from 'react'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import uuid from 'uuid'
import { assoc, map, dissoc } from 'ramda'
import { createSession, getAllPractices } from '../services'


module.exports = React.createClass({

  getInitialState(){
    const { match } = this.props
    return({
      _id: `session_${moment().unix()}_${uuid.v4()}`,
      name: 'Tara',
      time: moment().unix(),
      type: 'session',
      practices: []
    })
  },
  componentDidMount(){
    getAllPractices(this.state)
      .then(res => this.setState({practices: res}))
      .catch(err => console.log('err',err))
  },
  handleChange(path){
    return e => {
      const { state } = this
      const newState = path === 'amount'
                        ? assoc(path,Number(e.target.value),state)
                        : assoc(path,e.target.value,state)

      this.setState(newState)
    }
  },
  onSave(e){
    e.preventDefault()
    const session = dissoc('practices',this.state)
    createSession(session)
      .then(res => this.setState({success: true}))
      .catch(err => console.log('err',err))
  },
  render(){
    const renderOptions = ({name}) => <option value={name}>{name}</option>
    console.log('state',this.state)
    return (
      <div>
        {
          this.state.success
            ? <Redirect to="/"/>
            : null
        }
        <h1 className="tc page-header">Add New <span className="ttc">{this.state.name}</span> Session</h1>
        <form>
          <div className="db mt3">
            <label className="db form-label">Practice</label>
            <select className="mt1 pa1 w-100 black mb2" onChange={this.handleChange('name')}>
              {map(renderOptions,this.state.practices)}
            </select>
            </div>
          <label className="db form-label">Count or Minutes</label>
          <input onChange={this.handleChange('amount')} className="db w-100 input pa1" type="number"/>
          <button onClick={this.onSave} className="button mt3 pointer">Submit</button>
        </form>
      </div>
    )
  }
})