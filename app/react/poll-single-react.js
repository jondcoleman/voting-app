'use strict';

var myPollUrl = appUrl + 'api/poll/' + _id;


var PollDetail = React.createClass({
  loadPollsFromServer: function() {
    $.getJSON(myPollUrl, function(data){
      this.setState({data: data});
    }.bind(this))
  },
  getInitialState: function() {
    return {data: []};
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
                <PollOptions data={pollDetails.options} onVote={this.vote}/>
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
        console.log(result);
      },
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
                  <div className="button-cn">
                    <div className="poll-vote-button btn btn-primary" onClick={this.handleClick.bind(this, option, index)}>Vote</div>
                  </div>
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

ReactDOM.render(
  <PollDetail />,
  document.getElementById('single-poll')
);