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
      data: []
    })
  },
  render(){
    return (
      <div className="mt4">
        <HomeCursor />
      </div>
    )
  }
})
