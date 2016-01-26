var React = require('react');
var PollList = require('./PollList');
//var Ajax = require('simple-ajax');
var Api = require('../utils/api');

module.exports = React.createClass({
  getInitialState: function() {
    return {polls: []}
  },
  componentDidMount: function(){
    Api.get('polls')
      .then(function(data){
        this.setState({
          polls: data
        })
      }.bind(this))
  },
  render: function() {
    return (
      <PollList polls={this.state.polls}/>
    )
  }
})
