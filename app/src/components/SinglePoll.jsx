var React = require('react');
var Poll = require('./Poll');
//var Ajax = require('simple-ajax');
var Api = require('../utils/api');
var LocalSession = require('../utils/localSession');

localSession = new LocalSession();

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
      this.state.poll ? <Poll poll={this.state.poll} addVote={this.handleVote} deletePoll={this.props.deletePoll} type={this.props.type} allowEdit={this.props.allowEdit} handleNewOption={this.handleNewOption}/> : null
    )
  },
  handleVote: function(optionIndex) {
    this.state.poll.options[optionIndex].votes++
    this.setState({
      poll: this.state.poll
    })
    localSession.addVotedPoll(this.state.poll._id);
    Api.Put('poll/' + this.state.poll._id + '/' + optionIndex)
      .then(function(data){
        console.log(data)
      })
    },
    handleNewOption: function(newOption){
      var json = {newOptionName: newOption}
      Api.post('addOption/' + this.state.poll._id, json)
        .then(function(data){
          console.log(data)
        })
      localSession.addVotedPoll(this.state.poll._id);
      this.state.poll.options.push({
        optionName: newOption,
        votes: 1
      })
      console.log("need to post data here")
    }
})
