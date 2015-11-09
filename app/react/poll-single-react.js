'use strict';

var myPollUrl = appUrl + 'api/poll/' + _id;


var PollDetail = React.createClass({
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
          <div className="container">
            <div className="row">
              <div className="poll-detail col-md-8 col-md-offset-2" key={this.state.data._id}>
                <div className="poll-title"><h2>{this.state.data.pollName}</h2></div>
                <PollOptions data={pollDetails.options} onVote={this.vote} showResults={this.state.showResults}/>
              </div>
            </div>
          </div>
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

var PollOptions = React.createClass({
    render: function() {
        if (this.props.data) { //if statement prevents map error because data is undefined initially
          var options = this.props.data.map(function(option, index){
            return (
                <div className="poll-option" key={option._id}> 
                  { this.props.showResults ? null :
                    <div className="button-cn">
                      <div className="poll-vote-button btn" onClick={this.handleClick.bind(this, option, index)}>Vote</div>
                    </div>
                  }
                  { this.props.showResults ? <div className="poll-votes-number">{option.votes}</div> : null }
                  <div className="poll-option-name">{option.optionName}</div>
                </div>
              )
          }, this)
        }
        
        return (
            <div className="poll-options">
              {options}
            </div>
          )
    },
    handleClick: function(option, index) {
      this.props.onVote(option, index);
    }
})

var PollOptionsVoted = React.createClass({
    render: function() {
        var options = this.props.data.map(function(option){
          return (
              <div className="poll-option" key={option._id}> 
                <div className="poll-votes-number">{option.votes}</div>
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
  <PollDetail />,
  document.getElementById('single-poll')
);