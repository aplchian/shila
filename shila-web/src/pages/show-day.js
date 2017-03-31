import moment from 'moment'
import React from 'react'

module.exports = (props) => {
  return (
    <div>
      <h1>{moment().format('l')}</h1>
    </div>
  )
}