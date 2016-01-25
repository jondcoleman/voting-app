var React = require('react');

var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Badge = require('react-bootstrap').Badge;
var Link = require('react-router').Link;

var Chart = require('./chart');

var Api = require('../utils/api');

module.exports = React.createClass({
  getInitialState: function() {
    return ({type: this.props.type || 'vote'})
  },
  render: function() {
    var options = this.props.poll.options.map(function(option, index) {
      return (
        <ListGroupItem key={index}>
          {this.state.type === 'vote' ? <Button onClick={this.handleVote.bind(null, index)}>Vote</Button> : <Badge>{option.votes.length}</Badge>}
          <span className="poll-option-name">{option.optionName}</span>
        </ListGroupItem>
      )
    }.bind(this))
    console.log(this.props.poll)
    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3}>
            <div>
              <h1><Link to={'/poll/' + this.props.poll._id}>{this.props.poll.pollName}</Link></h1>
              <ListGroup>
                {options}
              </ListGroup>
            </div>
            {this.props.allowEdit ?
              <div>
                <Link to={'/edit/' + this.props.poll._id}><Button bsStyle="success">Edit</Button></Link>
                <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
              </div>
            :
            null
          }
          </Col>
        </Row>
        <Row>
          <Col md={6} mdOffset={3}>
            <Chart poll={this.props.poll} />
          </Col>
        </Row>
      </Grid>
    )
  },
  handleDelete: function(e){
    e.preventDefault;
    this.props.deletePoll(this.props.poll._id, this.props.index);
  },
  handleVote: function(optionIndex) {
    this.props.addVote(optionIndex);
    this.setState({
      type: 'result'
    })
  }
})
