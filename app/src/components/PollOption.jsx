var React = require('react');
var Input = require('react-bootstrap').Input;

module.exports = React.createClass({
  getInitialState: function() {
    return (
      {something : undefined}
    )
  },
  componentDidMount: function(
    //do something here if need be
  ) {},
  render: function() {
    return (
      <Input type="text" placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.onChange}/>
    )
  }
})
