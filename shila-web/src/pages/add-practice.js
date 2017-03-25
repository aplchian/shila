import React from 'react'
import uuid from 'uuid'
import { assoc } from 'ramda'
import { createPractice } from '../services'
import { Redirect } from 'react-router-dom'




module.exports = React.createClass({
  getInitialState(){
    return({
      _id: `practice_${uuid.v4()}`,
      type: 'count',
      name: '',
    })
  },
  handleChange(path){
    return e => {
      const { state } = this
      const newState = assoc(path,e.target.value,state)
      this.setState(newState)
    }
  },
  onSave(e){
    e.preventDefault()
    
    createPractice(this.state)
      .then(res => this.setState({success: true}))
      .catch(err => console.log('err',err))
  },
  render(){
    console.log('this.state',this.state)
    return(
      <div>
          {
            this.state.success
              ? <Redirect to="/"/>
              : null
          }
        <h1 className="tc page-header">Add New Practice</h1>
        <form>
          <label className="db form-label">Name</label>
          <input onChange={this.handleChange('name')} className="db w-100 input pa1" type="text"/>
          <div>
            <div className="db mt3">
              <label className="db form-label">Type</label>
              <select className="mt1 pa1 w-100 black" onChange={this.handleChange('type')}>
                <option value="count">Count</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>
          <button onClick={this.onSave} className="button mt3 pointer">Submit</button>
        </form>
      </div>
    )
  }
})