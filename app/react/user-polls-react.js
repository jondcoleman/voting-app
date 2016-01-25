'use strict';

var myPollsUrl = appUrl + 'api/polls';
var pollUrl = appUrl + 'api/poll'

var PollList = React.createClass({
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
    setInterval(this.loadPollsFromServer, 1000);  //used for polling regularly for live updates
  },
  render: function() {
    var pollDetails = this.state.data.map(function(detail, index){
      var pollUrl = appUrl + 'polls/' + detail._id;
      var shareUrl = "http://twitter.com/share?text=Vote on my poll:&url=" + pollUrl
      return (
        <div className="container" key={detail._id}>
          <div className="row">
            <div className="poll-detail col-md-8 col-md-offset-2">
              <h1><a href={pollUrl}>{detail.pollName}</a></h1>
              <PollOptions data={detail.options}/>
              <div>
                <div className="btn btn-danger btn-delete-poll blah" onClick={this.remove.bind(this, detail, index)}>DELETE POLL</div>
              </div>
              <div>
                <div className="twitter-container">
                  <a className="btn btn-social-icon btn-twitter" href={shareUrl} target="_blank">
                    <span className="fa fa-twitter"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }, this)

    return (
        <div className="poll-list">
          {pollDetails}
        </div>
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

var PollOptions = React.createClass({
    render: function() {
        var options = this.props.data.map(function(option){
          return (
              <div className="poll-option" key={option._id}>
                <div className="poll-votes-number">{option.votes.length}</div>
                <div className="poll-option-name">{option.optionName}</div>
              </div>
            )
        })
        return (
            <div className="poll-options">
              {options}
            </div>
          )
    }
})

ReactDOM.render(
  <PollList />,
  document.getElementById('user-poll-list')
  );
