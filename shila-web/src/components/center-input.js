import React from 'react'
import { append, init, length, find, filter, join,
         indexOf, head, toUpper, isEmpty, prop, type } from 'ramda'
import { Redirect } from 'react-router-dom'

const stylesShow = {
  background: '#494949',
  height: 41,
  width: 2,
  position: 'relative',
  bottom: 23
}

const stylesHide = {
  background: 'transparent',
  height: 41,
  width: 2,
  position: 'relative',
  bottom: 23
}

module.exports = React.createClass({
  getInitialState(){
    return({
      show: true,
    })
  },
  blink(){
    this.setState({show: !this.state.show})
  },
  onKeyUp(e){
    if(length(this.state.value) > 1){
     const filterPractices = ({ name }) => toUpper(name).indexOf(toUpper(this.state.value), 0) > -1
     const filtered = filter(filterPractices,this.state.practices)
     const found = !!filtered ? head(filtered) : []
     return this.setState({found})
    }else {
      return this.setState({found: []})
    }
  },
  onSubmit(e){
    if(type(length(this.state.value) > 0)){
      this.props.onSave(Number(this.state.value))
    }else {
      console.log('enter an amount!')
    }
  },
  onKeyPress(key){
  const value = join('',append(key,this.state.value))
  const suggested = find
  return this.setState({value})
  },
  componentDidMount(){


    this.timer = setInterval(this.blink, 700);
    document.addEventListener('keydown',({key}) => {
      if(key === 'Backspace'){
        const value = init(this.state.value)
        return this.setState({value})
      }else if(key === 'Enter'){
        return this.onSubmit()
      }else if (length(key) === 1){
        this.onKeyPress(key)
      }
    })
    document.addEventListener('keyup',({key}) => {
      this.onKeyUp(key)
    })
  },
  componentWillUnmount: function(){
    clearInterval(this.timer);
  },
  render(){

    const format = this.props.format === 'count'
                    ? 'x'
                    : 'min'

    return(
      <div className="center-input-container">
        <div className="middle">
          <span className="center-input-text">{this.state.value}</span> 
            {
              this.state.show 
                ? <div className="dib" style={stylesShow}><span className="ml2"></span></div>
                : <div className="dib" style={stylesHide}><span className="ml2"></span></div>
            }
          <span className="center-input-format">{format}</span>
        </div>
      </div>
    )
  }
})