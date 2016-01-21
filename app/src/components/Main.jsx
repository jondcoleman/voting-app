var React = require('react');
//var Ajax = require('simple-ajax');
var Navbar = require('./Navbar');
var PollForm = require('./PollForm');
var Api = require('../utils/api');

module.exports = React.createClass({
  getInitialState: function() {
    return ({user: undefined})
  },
  componentDidMount: function() {
    Api.get('user')
      .then(function(data){
        data ? this.setState({user : data}) : null;
      }.bind(this))
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
