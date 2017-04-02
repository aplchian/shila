import React from 'react'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import uuid from 'uuid'
import { assoc, map, dissoc } from 'ramda'
import { createSession, getDoc } from '../services'
import { CenterInput } from '../components'


module.exports = React.createClass({

  getInitialState(){
    const { match } = this.props
    return({
      _id: `session_${moment().unix()}_${uuid.v4()}`,
      practice: this.props.match.params.name,
      time: moment().unix(),
      type: 'session',
    })
  },
  componentDidMount(){
    getDoc(this.props.match.params.name)
      .then(res => this.setState({practice: res}))
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
  saveCount(amount){
    this.setState({amount})
  },
  render(){
    console.log('state',this.state)
    const format = this.state.practice.format === 'count'
                    ? 'x'
                    : 'min'
    return (
      <div>
        {
          this.state.success
            ? <Redirect to="/"/>
            : null
        }
        <div className="session-name-header">
          <h1>{this.state.practice.name}</h1>
          {
            this.state.amount 
              ? <h2>{this.state.amount} {format}</h2>
              : null
          }
        </div>
        <CenterInput
          format={this.state.practice.format}
          onSave={this.saveCount}
        />
      </div>
    )
  }
})