var React = require('react');
var Poll = require('./Poll');
//var Ajax = require('simple-ajax');

module.exports = React.createClass({
  getInitialState: function() {
    return ({poll: undefined})
  },
  componentDidMount: function(){
    // var ajax = new Ajax({
    //   url: '/api/poll/' + this.props.params.pollid,
    //   method: 'GET'
    // })
    //
    // ajax.on('success', function(event){
    //   this.setState({
    //     poll: JSON.parse(event.target.response)
    //   })
    // }.bind(this))
    //
    // ajax.send();
  },
  render: function() {
    return (
      this.state.poll ? <Poll poll={this.state.poll} type='vote' handleVote={this.handleVote}/> : null
    )
  },
  handleVote: function(optionIndex) {
    console.log(optionIndex)
    var ajax = new Ajax({
      url: '/api/poll/' + this.state.poll._id + '/' + optionIndex,
      method: 'PUT'
    })

    ajax.on('success', function(event){
      console.log(event)
    }.bind(this))

    ajax.send();
  }
})
