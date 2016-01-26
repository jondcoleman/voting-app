var React = require('react');
var ReactDOM = require('react-dom');
var Routes = require('./Routes');

var App = React.createClass({
  render: function() {
    return (
      <Routes/>
    )
  }
})

ReactDOM.render(
  <App/>,
  document.getElementById('content')
);
