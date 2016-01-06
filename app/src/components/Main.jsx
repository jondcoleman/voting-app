var React = require('react');
var Ajax = require('simple-ajax');
var Navbar = require('./Navbar');
var PollForm = require('./PollForm');

module.exports = React.createClass({
  getInitialState: function() {
    return ({user: undefined})
  },
  componentDidMount: function() {
    var ajax = new Ajax({
      url: '/api/user',
      method: 'GET'
    })

    ajax.on('success', function(event){
      response = event.target.response;
      response === '' ? null : this.setState({user: JSON.parse(response)})
    }.bind(this))

    ajax.send();
  },
  render: function() {
    return (
      <div>
        <Navbar user={this.state.user}/>
				{this.props.children}
      </div>
    )
  }
})
