import React from 'react'

const styles = {
  background: '#494949',
  height: 41,
  width: 2
}


module.exports = React.createClass({
  getInitialState(){
    return({
      show: true
    })
  },
  blink(){
    this.setState({show: !this.state.show})
  },
  componentDidMount(){
    this.timer = setInterval(this.blink, 700);
  },
  componentWillUnmount: function(){
    clearInterval(this.timer);
  },
  render(){
    const { text } = this.props
    return(
      <div className="home-cursor-container">
       <span className="home-cursor-text">{text}</span> 
        {
          this.state.show 
            ? <div className="dib" style={styles}></div>
            : null
        }
      </div>
    )
  }
})