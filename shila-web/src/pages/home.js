import React from 'react'
import { map, pluck } from 'ramda'
import { Link } from 'react-router-dom'
import { getAllPractices } from '../services'


module.exports = React.createClass({
  getInitialState(){
    return({
      data: [
        {
          name: 'Tara',
          amount: '220',
          type: 'count'
        },
        {
          name: 'Meditation',
          amount: '2 hour',
          type: 'duration'
        }
      ]
    })
  },
  componentDidMount(){
    getAllPractices()
      .then(({ rows }) => {
        const data = pluck('doc',rows)
        this.setState({data})
      })
      .catch(err => console.log('err',err))
  },
  render(){
    const renderTimes = ({ name, amount, type }) => {
      return (
        <li className="w-100 home-list cf mt2">
          <Link className="link" to={`/session/add/${type}`}>
            <div className="fl link white">{name}</div>
          </Link>
          <div className="fr">{amount}</div>
        </li>
      )
    }

    return (
      <div>
        <h1 className="tc page-header">All Time</h1>
        <ul className="pa0 ma0 w-100 list">
          {map(renderTimes,this.state.data)}
        </ul>
      </div>
    )
  }
})