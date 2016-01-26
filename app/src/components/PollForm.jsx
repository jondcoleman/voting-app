var React = require('react');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Input = require('react-bootstrap').Input;
var PollOption = require('./PollOption');
var Button = require('react-bootstrap').Button;
//var Ajax = require('simple-ajax');
var Api = require('../utils/api');
var Routes = require('../Routes');
var History = require('react-router').History

var blankPoll = {
  pollName: '',
  options: [
    {
      optionName: '',
      placeholder: "Option 1"
    }, {
      optionName: '',
      placeholder: "Option 2"
    }
  ]
}

module.exports = React.createClass({
  mixins: [History],
  getInitialState: function() {
    return {poll: blankPoll}
  },
  componentDidMount: function() {
    if (this.props.params.pollid){
      Api.get('poll/' + this.props.params.pollid)
        .then(function(data){
          this.setState({
            poll: data
          })
        }.bind(this))
    }
  },
  handleOptionChange: function(index, e) {
    var newOptions = this.state.poll.options.slice();
    newOptions[index].optionName = e.target.value;
    this.setState({options: newOptions})
  },
  handleTitleChange: function(e) {
    this.state.poll.pollName = e.target.value
    this.setState({poll: this.state.poll})
  },
  addOption: function(e) {
    var newOptions = this.state.poll.options.slice();
    var newOptionNumber = this.state.poll.options.length + 1;
    newOptions.push({
      value: '',
      placeholder: "Option " + newOptionNumber
    })
    this.state.poll.options = newOptions;
    this.setState({poll: this.state.poll})
  },
  savePoll: function(e) {
    e.preventDefault;
    Api.post('polls', this.state.poll)
      .then(function(data){
        this.history.pushState(null, '/poll/' + data._id)
      }.bind(this))
  },
  render: function() {
    var pollOptions = this.state.poll.options.map(function(option, index) {
      return <PollOption placeholder={option.placeholder} key={index} value={option.optionName} onChange={this.handleOptionChange.bind(this, index)}/>
    }.bind(this))

    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3}>
            <form>
              <Input type="text" label="Poll Name" placeholder="What is your favorite type of poll?" value={this.state.poll.pollName} onChange={this.handleTitleChange}/>
              <label className="control-label">Poll Options</label>
              {pollOptions}
              <Button onClick={this.addOption}>Add Option</Button>
              <Button onClick={this.savePoll}>Save</Button>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }
})
