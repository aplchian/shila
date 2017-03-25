import React from 'react'
import { map, curry } from 'ramda'






module.exports = React.createClass({
  getInitialState(){
    return ({
      selected: this.props.selected,
      expand: false
    })
  },
  handleClick(value){
    return e => {
      e.preventDefault()
      this.setState({selected: value, expand: false})
    }
  },
  toggleExand(e){
    const expand = !this.state.expand
    this.setState({expand})
  },
  render(){
    const { selected } = this.state
    const { options } = this.props

    const renderOptions = curry((handleClick,option) => {
      return (
        <div>
          {
            option.value === this.state.selected.value
              ? null
              : <div className="select-option" style={optionS} onClick={handleClick(option)}>{option.name}</div>
          }
        </div>
      
      )
    })


    return (
      <div style={container}>
        <div onClick={this.toggleExand} className="mt3 pointer" style={selectedS}>{selected.name} <span className="drop-carrot"></span></div>
        <div style={optionContainS}>
          { 
            !!this.state.expand
              ? <div className="option-container">{map(renderOptions(this.handleClick),options)}</div>
              : null
          }
        </div>
      </div>
    )

  }
})


var selectedS = {
  fontFamily: 'AvenirNext-Regular',
  fontSize: '18px',
  color: '#FFFFFF',
  letterSpacing: '0',
  textAlign: 'center'
}

var optionS = {
  width: '100%',
  color: 'white',
  fontFamily: 'AvenirNext-Regular',
  fontSize: '12px',
  color: '#FFFFFF',
  textAlign: 'center',
  padding: '5px 0',
  cursor: 'pointer'
}

var optionContainS = {
  background: '#1F1F1F',
  boxShadow: '0 2px 4px 0 rgba(7,7,7,0.50)',
  borderRadius: '1px'
}




var container = {
  width: 154,
  margin: '0 auto'
}