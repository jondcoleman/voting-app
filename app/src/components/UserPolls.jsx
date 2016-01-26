var React = require('react');
var PollList = require('./PollList');
//var Ajax = require('simple-ajax');
var Api = require('../utils/api');

module.exports = React.createClass({
  getInitialState: function() {
    return {polls: []}
  },
  componentDidMount: function(){
    Api.get('my-polls')
      .then(function(data){
        this.setState({
          polls: data
        })
      }.bind(this))
  },
  render: function() {
    return (
      <PollList polls={this.state.polls} deletePoll={this.deletePoll} type={'view'} allowEdit={true}/>
    )
  },
  deletePoll: function(pollId, index) {
    newPolls = this.state.polls.slice()
    newPolls.splice(index, 1)
    this.setState({polls: newPolls})
    Api.delete('poll/' + pollId);
  }
})
