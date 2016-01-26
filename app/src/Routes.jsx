var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;

var Main = require('./components/Main');
var PollForm = require('./components/PollForm');
var Poll = require('./components/Poll');
var SinglePoll = require('./components/SinglePoll');
var AllPolls = require('./components/AllPolls');
var UserPolls = require('./components/UserPolls');

module.exports = React.createClass({

	render: function() {
		return (
			<Router>
				<Route path="/" component={Main}>
					<IndexRoute component={AllPolls}/>
					<Route path="/addpoll" component={PollForm}/>
					<Route path="/allpolls" component={AllPolls}/>
					<Route path="/mypolls" component={UserPolls}/>
					<Route path="/poll/:pollid" component={SinglePoll}/>
					<Route path="/edit/:pollid" component={PollForm}/>
				</Route>
			</Router>
		)
	}
})
