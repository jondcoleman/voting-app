var React = require('react');
var Poll = require('./Poll');

module.exports = React.createClass({
  render: function() {
    var polls = this.props.polls.map(function(poll, index) {
      return <Poll poll={poll} key={index} index={index} type={this.props.type} deletePoll={this.props.deletePoll} allowEdit={this.props.allowEdit}/>
    }.bind(this))

    return (
      <div>
        {polls}
      </div>
    )
  }
})
