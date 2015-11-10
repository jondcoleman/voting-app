'use strict';

var myPollUrl = appUrl + 'api/poll/' + _id;


var PollDetail = React.createClass({displayName: "PollDetail",
  loadPollsFromServer: function(showResultsParam) {
    $.getJSON(myPollUrl, function(data){
      this.setState({data: data, showResults: showResultsParam});
    }.bind(this))
  },
  getInitialState: function() {
    return {data: [], showResults: false  };
  },
  componentDidMount: function() {
    this.loadPollsFromServer();
    //setInterval(this.loadPollsFromServer, this.props.pollInterval);  //Could be used for polling regularly
  },
  render: function() {
      var pollDetails = this.state.data;
      return (
          React.createElement("div", {className: "container"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "poll-detail col-md-8 col-md-offset-2", key: this.state.data._id}, 
                React.createElement("div", {className: "poll-title"}, React.createElement("h2", null, this.state.data.pollName)), 
                React.createElement(PollOptions, {data: pollDetails.options, onVote: this.vote, showResults: this.state.showResults})
              )
            )
          )
      );
  },
  vote: function(option, index) {
    $.ajax({
      url: myPollUrl + '/' + index,
      type: 'PUT',
      success: function(result) {
        alert(result.message);
        this.loadPollsFromServer(true);
      }.bind(this),
      error: function(data) {
        console.log('fail');
      }
    })
  }
});

var PollOptions = React.createClass({displayName: "PollOptions",
    render: function() {
        if (this.props.data) { //if statement prevents map error because data is undefined initially
          var options = this.props.data.map(function(option, index){
            return (
                React.createElement("div", {className: "poll-option", key: option._id}, 
                   this.props.showResults ? null :
                    React.createElement("div", {className: "button-cn"}, 
                      React.createElement("div", {className: "poll-vote-button btn", onClick: this.handleClick.bind(this, option, index)}, "Vote")
                    ), 
                  
                   this.props.showResults ? React.createElement("div", {className: "poll-votes-number"}, option.votes) : null, 
                  React.createElement("div", {className: "poll-option-name"}, option.optionName)
                )
              )
          }, this)
        }
        
        return (
            React.createElement("div", {className: "poll-options"}, 
              options
            )
          )
    },
    handleClick: function(option, index) {
      this.props.onVote(option, index);
    }
})

var PollOptionsVoted = React.createClass({displayName: "PollOptionsVoted",
    render: function() {
        var options = this.props.data.map(function(option){
          return (
              React.createElement("div", {className: "poll-option", key: option._id}, 
                React.createElement("div", {className: "poll-votes-number"}, option.votes), 
                React.createElement("div", {className: "poll-option-name"}, option.optionName)
              )
            )
        })
        return (
            React.createElement("div", {className: "poll-options"}, 
              options
            )
          )
    }
})


ReactDOM.render(
  React.createElement(PollDetail, null),
  document.getElementById('single-poll')
);