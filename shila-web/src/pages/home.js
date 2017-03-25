import React from 'react'
import { map, pluck, keys, head } from 'ramda'
import { Link } from 'react-router-dom'
import { getAllSessions } from '../services'
import { Select } from '../components'


module.exports = React.createClass({
  getInitialState(){
    return({
      data: [],
      sortOptions,
      currentOption: head(sortOptions)
    })
  },
  componentDidMount(){
    getAllSessions()
      .then((obj) => {
        const objKeys = keys(obj)
        const data = map((key) => ({name: key, count: obj[key]}),objKeys)
        this.setState({data})
      })
      .catch(err => console.log('err',err))
  },
  render(){
    const renderTimes = ({ name, count }) => {
      return (
        <li className="w-100 home-list cf mt2">
          <Link className="link" to={`/session/add/${name}`}>
            <div className="fl link white">{name}</div>
          </Link>
          <div className="fr">{count}</div>
        </li>
      )
    }

    console.log('state',this.state)

    return (
      <div>
        <Select
          options={this.state.sortOptions}
          selected={this.state.currentOption}
         />
        <ul className="pa0 ma0 w-100 list">
          {map(renderTimes,this.state.data)}
        </ul>
      </div>
    )
  }
})



var sortOptions = [
  {
    value: 'today',
    name: 'today'
  },
  {
    value: 'all-time',
    name: 'all time'
  },
  {
    value: 'last-7-days',
    name: 'last 7 days'
  },
  {
    value: 'this-month',
    name: 'this month'
  },
]