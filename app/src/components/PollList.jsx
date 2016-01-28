var React = require('react');
var Poll = require('./Poll');
var SinglePoll = require('./SinglePoll');
var Api = require('../utils/api');

module.exports = React.createClass({
  getInitialState: function(){
    return ({user:undefined})
  },
  componentDidMount: function(){
    Api.get('user')
      .then(function(data){
        data ? this.setState({user : data}) : null;
      }.bind(this))
  },
  render: function() {
    var polls = this.props.polls.map(function(poll, index) {
      return <SinglePoll type={this.props.type} user={this.state.user} poll={poll} key={index} index={index} deletePoll={this.props.deletePoll} allowEdit={this.props.allowEdit}/>
    }.bind(this))

    return (
      <div>
        {polls}
      </div>
    )
  }
})
