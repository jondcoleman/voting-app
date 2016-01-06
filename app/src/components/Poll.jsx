var React = require('react');

var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Badge = require('react-bootstrap').Badge;

var samplePoll = {
  type: 'view',
  poll: {
    pollName: 'Testing a Poll?',
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


module.exports = React.createClass({
  componentDidMount: function(
  //do something here if need be
  ) {},
  render: function() {
    var options = this.props.poll.options.map(function(option, index) {
      return (
        <ListGroupItem key={index}>
          {this.props.type === 'vote' ? <Button>Vote</Button> : <Badge>{option.votes}</Badge>}
          <span className="poll-option-name">{option.optionName}</span>
        </ListGroupItem>
      )
    }.bind(this))

    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3}>
            <div>
              <h1>{this.props.poll.pollName}</h1>
              <ListGroup>
                {options}
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
})
