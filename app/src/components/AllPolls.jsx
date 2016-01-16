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
      .then(function(json){
        this.setState({
          polls: json
        })
      }.bind(this))

    // var ajax = new Ajax({
    //   url: '/api/polls',
    //   method: 'GET'
    // })
    //
    // ajax.on('success', function(event){
    //   this.setState({
    //     polls: JSON.parse(event.target.response)
    //   })
    // }.bind(this))
    //
    // ajax.send();
  },
  render: function() {
    return (
      <PollList polls={this.state.polls} type={'view'}/>
    )
  }
})
