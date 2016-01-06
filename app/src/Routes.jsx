var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;

var Main = require('./components/Main');
var PollForm = require('./components/PollForm');
var Poll = require('./components/Poll');
var AllPolls = require('./components/AllPolls');
var UserPolls = require('./components/UserPolls');

module.exports = React.createClass({

	render: function() {
		// var UserGrid = React.createClass({
		// 	render: function() {
		// 		return (
		// 			<Grid type="user" userId={this.props.routeParams.userId} user={this.props.user}/>
		// 		)
		// 	}
		// })

		return (
			<Router>
				<Route path="/" component={Main}>
					<IndexRoute component={AllPolls}/>
					<Route path="/addpoll" component={PollForm}/>
					<Route path="/allpolls" component={AllPolls}/>
					<Route path="/mypolls" component={UserPolls}/>
				</Route>
			</Router>
		)
	}
})
