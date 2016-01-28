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
var LocalSession = require('../utils/localSession');

localSession = new LocalSession();

module.exports = React.createClass({
  getInitialState: function() {
    return ({
      type: this.props.type || 'vote',
      newOption: undefined
    })
  },
  componentDidMount: function() {
    this.setState({
      type: localSession.checkVotedPoll(this.props.poll._id) ? 'view' : 'vote'
    })
  },
  render: function() {
    var options = this.props.poll.options.map(function(option, index) {
      return (
        <ListGroupItem key={index}>
          {this.state.type === 'vote' ? <Button onClick={this.handleVote.bind(null, index)}>Vote</Button> : <Badge>{option.votes}</Badge>}
          <span className="poll-option-name">{option.optionName}</span>
        </ListGroupItem>
      )
    }.bind(this))
    return (
      <Grid className="poll-container">
        <Row>
          <Col md={6} mdOffset={3}>
            <h3><Link to={'/poll/' + this.props.poll._id}>{this.props.poll.pollName}</Link></h3>
            <div>
              <ListGroup>
                {options}
              </ListGroup>
            </div>
            {this.props.allowEdit ?
              <div className="btn-container">
                <Link to={'/edit/' + this.props.poll._id}><Button bsStyle="success">Edit</Button></Link>
                <Button bsStyle="danger" onClick={this.handleDelete}>Delete</Button>
              </div>
            :
            null
            }
            {this.state.type === 'vote' ?
            <form>
              <Input type="text" placeholder={"New Option Name"} required value={this.state.newOption} onChange={this.handleInput}/>
              <Button bsStyle="default" disabled={!this.state.newOption} onClick={this.addNewOption}>Add & Vote for New Option</Button>
            </form>
            :
            null
            }
          </Col>
        </Row>
        {this.state.type === 'vote' ?
          null
          :
          <Row>
            <Col md={6} mdOffset={3}>
              <div className="poll-chart-container">
                <Chart poll={this.props.poll} />
              </div>
            </Col>
          </Row>
        }

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
  },
  handleInput: function(e){
    this.setState({newOption: e.target.value})
  },
  addNewOption: function(e){
    e.preventDefault()
    this.props.handleNewOption(this.state.newOption)
    this.setState({
      newOption: undefined,
      type: 'result'
    })
  }

})
