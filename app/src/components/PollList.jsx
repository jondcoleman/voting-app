var React = require('react');
var Poll = require('./Poll');

module.exports = React.createClass({
  componentDidMount: function(
  //do something here if need be
  ) {},
  render: function() {
    var polls = this.props.polls.map(function(poll, index) {
      return <Poll poll={poll} key={index} type={this.props.type} allowEdit={this.props.allowEdit}/>
    }.bind(this))

    return (
      <div>
        {polls}
      </div>
    )
  }
})
