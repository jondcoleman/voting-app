'use strict';

var myPollsUrl = appUrl + 'api/polls';
var pollUrl = appUrl + 'api/poll'

var PollList = React.createClass({displayName: "PollList",
  loadPollsFromServer: function() {
    $.getJSON(myPollsUrl, function(data){
      this.setState({data: data});
    }.bind(this))
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPollsFromServer();
    setInterval(this.loadPollsFromServer, 1000);  //Could be used for polling regularly
  },
  render: function() {
    var pollDetails = this.state.data.map(function(detail, index){
      var pollUrl = appUrl + 'polls/' + detail._id;
      return (
        React.createElement("div", {className: "container", key: detail._id}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "poll-detail col-md-8 col-md-offset-2"}, 
              React.createElement("h1", null, React.createElement("a", {href: pollUrl}, detail.pollName)), 
              React.createElement(PollOptions, {data: detail.options}), 
              React.createElement("div", {className: "btn btn-danger btn-delete-poll blah", onClick: this.remove.bind(this, detail, index)}, "DELETE POLL")
            )
          )
        )
      );
    }, this)
    
    return (
        React.createElement("div", {className: "poll-list"}, 
          pollDetails
        )  
      )
  },
  
  remove: function(poll, index) {
    var component = this; //PollList Component

    //optimistic update
    var polls = this.state.data;
    polls.splice(index, 1);
    this.setState({data: polls});

    $.ajax({
        url: pollUrl + '/' + poll._id,
        type: 'DELETE',
        success: function(result) {
            console.log(result);
            component.loadPollsFromServer();
        },
        error: function(data) {
          console.log('fail');
        }
    });
  }
});

var PollOptions = React.createClass({displayName: "PollOptions",
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
  React.createElement(PollList, null),
  document.getElementById('user-poll-list')
  );