import React from 'react'
import { append, init, length, find, filter, join,
         indexOf, head, toUpper, isEmpty, prop, type } from 'ramda'
import { Redirect } from 'react-router-dom'

const styles = {
  background: '#494949',
  height: 41,
  width: 2
}


module.exports = React.createClass({
  getInitialState(){
    return({
      show: true,
      practices: [
        {
          "_id": "practice_d32b5acb-0386-414c-8a8c-794d4daf5a36",
          "_rev": "1-9bf0a10c296ba430710af07deb111744",
          "format": "duration",
          "name": "Meditation",
          "type": "practice"
        },
        {
          "_id": "practice_9389892c-fa03-4ad8-9374-f8ec15b59160",
          "_rev": "1-eeb9fa0934017c6a18044cd16df8c241",
          "format": "count",
          "name": "Tara",
          "type": "practice"
        }
      ]
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
    if(type(this.state.found === 'Object')){
      console.log('redirect!')
      this.setState({
        redirect: this.state.found._id
      })
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

    const suggestion = type(this.state.found) === 'Object'
                         ? prop('name',this.state.found) 
                         : null

    return(
      <div className="home-cursor-container">
        {
          this.state.redirect
            ? <Redirect to={`/session/add/${this.state.found._id}`} />
            : null
        }
       <span className="home-cursor-text">{this.state.value}</span> 
        {
          this.state.show 
            ? <div className="dib" style={styles}></div>
            : null
        }
        <span className="home-suggestion-text">{suggestion}</span>
      </div>
    )
  }
})