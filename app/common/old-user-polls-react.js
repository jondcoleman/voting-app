'use strict';

var myPollsUrl = appUrl + 'api/polls';

var polls = [];

$.getJSON(myPollsUrl, function(data){
    polls = data;
    ReactDOM.render(
    <PollList />,
    document.getElementById('content')
);
});

//ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', myPollsUrl, setPolls(data)));

// tutorial1.js
var PollList = React.createClass({
  render: function() {
    var pollDetails = polls.map(function(poll){
      return (
          <div className="poll-detail" key={poll._id}>
            <div className="poll-title">{poll.pollName}</div>
            <div className="poll-options">
              <div className="poll-option">Option 1</div>
            </div>
          </div>
        )
    })
      
    return (
        <div className="poll-list">
          {pollDetails}
        </div>
    );
  }
});

// var PollDetail = React.createClass({
//     render: function() {
        
//     }
// })



// $(document).ready(function(){
    
//     $('#addOption').click(function(){
//         options.push(options.length + 1);
//         console.log(options);
//         ReactDOM.render(
//             <PollForm />,
//             document.getElementById('content')
//         );
//     })
    
//     $('.pollForm').on("submit", function(event){
//         event.preventDefault();
//         //$('input:text[value=""]', '#pollForm').remove();
//         //var data = $("#pollForm :input[value!='']").serialize();
//         //var data = $(this).serialize();
//         var data = $("#pollForm input").filter(function () {
//             return !!this.value;
//         }).serialize();
//         console.log(data);
//         $.post('https://basejump2-jondcoleman.c9.io/api/polls', data);
//         this.reset();
//         initialize();
//         ReactDOM.render(
//             <PollForm />,
//             document.getElementById('content')
//         );
//     })
    
    
// })