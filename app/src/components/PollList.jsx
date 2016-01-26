var React = require('react');
var Poll = require('./Poll');
var SinglePoll = require('./SinglePoll');

module.exports = React.createClass({
  render: function() {
    var polls = this.props.polls.map(function(poll, index) {
      return <SinglePoll type={this.props.type} poll={poll} key={index} index={index} deletePoll={this.props.deletePoll} allowEdit={this.props.allowEdit}/>
    }.bind(this))

    return (
      <div>
        {polls}
      </div>
    )
  }
})
