var React = require('react');
var Poll = require('./Poll');
//var Ajax = require('simple-ajax');
var Api = require('../utils/api');

module.exports = React.createClass({
  getInitialState: function() {
    return ({poll: undefined})
  },
  componentDidMount: function(){
    Api.get('poll/' + this.props.params.pollid)
      .then(function(data){
        this.setState({
          poll: data
        })
      }.bind(this))
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
