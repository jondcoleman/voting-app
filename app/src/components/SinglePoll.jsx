var React = require('react');
var Poll = require('./Poll');
//var Ajax = require('simple-ajax');
var Api = require('../utils/api');

module.exports = React.createClass({
  getInitialState: function() {
    return ({poll: undefined})
  },
  componentDidMount: function(){
    this.props.params && this.props.params.pollid ?
    Api.get('poll/' + this.props.params.pollid)
      .then(function(data){
        this.setState({
          poll: data
        })
      }.bind(this))
    :
    this.setState({
      poll: this.props.poll
    })
  },
  render: function() {
    return (
      this.state.poll ? <Poll poll={this.state.poll} addVote={this.handleVote} deletePoll={this.props.deletePoll} type={this.props.type} allowEdit={this.props.allowEdit}/> : null
    )
  },
  handleVote: function(optionIndex) {
    this.state.poll.options[optionIndex].votes.push('tempSessionID')
    this.setState({
      poll: this.state.poll
    })
    Api.Put('poll/' + this.state.poll._id + '/' + optionIndex)
      .then(function(data){
        console.log(data)
      })
    }
})
