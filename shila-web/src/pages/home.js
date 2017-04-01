import React from 'react'
import { map, pluck, keys, head } from 'ramda'
import { Link } from 'react-router-dom'
import { getAllSessions } from '../services'
import { Select, HomeCursor } from '../components'
import CalendarHeatmap from 'react-calendar-heatmap';
import moment from 'moment'


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
  handleDateClick(date){
    return e => {
      console.log('date',date)
    }
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
      <div className="mt4">
        <HomeCursor />
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