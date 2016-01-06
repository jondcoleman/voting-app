var React = require('react');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Input = require('react-bootstrap').Input;
var PollOption = require('./PollOption');
var Button = require('react-bootstrap').Button;

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
  getInitialState: function() {
    return (this.props.pollDetails || blankPoll)
  },
  handleOptionChange: function(index, e) {
    var newOptions = this.state.options.slice();
    newOptions[index].value = e.target.value;
    this.setState({options: newOptions})
  },
  handleTitleChange: function(e) {
    this.setState({pollName: e.target.value})
  },
  addOption: function(e) {
    var newOptions = this.state.options.slice();
    var newOptionNumber = this.state.options.length + 1;
    newOptions.push({
      value: '',
      placeholder: "Option " + newOptionNumber
    })
    this.setState({options: newOptions})
  },
  savePoll: function(e) {
    e.preventDefault;
    console.log('fake saved!');
    console.log(JSON.stringify(this.state, null, 2))
  },
  componentDidMount: function(
  //do something here if need be
  ) {},
  render: function() {
    var pollOptions = this.state.options.map(function(option, index) {
      return <PollOption placeholder={option.placeholder} key={index} value={option.optionName} onChange={this.handleOptionChange.bind(this, index)}/>
    }.bind(this))

    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3}>
            <form>
              <Input type="text" label="Poll Name" placeholder="What is your favorite type of poll?" value={this.state.pollName} onChange={this.handleTitleChange}/>
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
