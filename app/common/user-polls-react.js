'use strict';

var myPollsUrl = appUrl + 'api/polls';

$.getJSON(myPollsUrl, function(data){
    var polls = data;
    ReactDOM.render(
    <PollList data={polls} />,
    document.getElementById('content')
);
});

var PollList = React.createClass({
  render: function() {
    var pollDetails = this.props.data.map(function(detail){
      console.log(detail.options);
      return (
          <div className="poll-detail" key={detail._id}>
            <div className="poll-title">{detail.pollName}</div>
            <PollOptions data={detail.options}/>
          </div>
      );
    })
    
    return (
        <div className="poll-list">
          {pollDetails}
        </div>  
      )
  }
});

var PollOptions = React.createClass({
    render: function() {
        var options = this.props.data.map(function(option){
          return (
              <div className="poll-option" key={option._id}>{option.optionName}</div>
            )
        })
        return (
            <div className="poll-options">
              {options}
            </div>
          )
    }
})