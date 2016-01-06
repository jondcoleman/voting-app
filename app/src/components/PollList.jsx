var React = require('react');
var Poll = require('./Poll');

samplePolls = {
  polls: [
    {
      type: 'vote',
      poll: {
        pollName: 'Testing a Poll',
        options: [
          {
            optionName: 'Option Test 1',
            votes: 2
          }, {
            optionName: 'Option Test 2',
            votes: 50
          }
        ]
      }
    },
    {
      type: 'view',
      poll: {
        pollName: 'Testing a Poll',
        options: [
          {
            optionName: 'Option Test 1',
            votes: 2
          }, {
            optionName: 'Option Test 2',
            votes: 50
          }
        ]
      }
    }
  ]
}

module.exports = React.createClass({
  componentDidMount: function(
  //do something here if need be
  ) {},
  render: function() {
    console.log(this.props)
    var polls = this.props.polls.map(function(poll, index) {
      return <Poll poll={poll} key={index} type={this.props.type}/>
    }.bind(this))

    return (
      <div>
        {polls}
      </div>
    )
  }
})
