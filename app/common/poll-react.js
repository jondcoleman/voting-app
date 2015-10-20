'use strict';

var options = [];
var initialize = function(){
    options = [1,2];
};
initialize();

// tutorial1.js
var PollForm = React.createClass({
  render: function() {
    return (
      <form action="" className="pollForm" id="pollForm">
        <div className="poll-title">
            <h4>Poll Name</h4>
        </div>
        <div>
          <input type="text" name="PollName" className="input-field" placeholder="Poll Name" />
        </div>
        <div>
          <h4 className="poll-title">Options</h4>
        </div>
        <div id="options">
          <PollOption />
        </div>
        <div id="addOption" className="btn btn-primary poll-buttons">Add Option</div>
        <div>
          <input type="submit" value="Submit" className="btn btn-success poll-buttons" />
        </div>
      </form>
    );
  }
});

var PollOption = React.createClass({
    render: function() {
        var optionDivs = options.map(function(option){
            var optionPlaceholder = "Option " + option.toString();
            return (
                    <div key={option}>
                        <input type="text" name="option" className="input-field input-option" placeholder={optionPlaceholder}/>
                    </div>
            )
        })
        return (
            <div>
                {optionDivs}
            </div>
            )
    }
})

ReactDOM.render(
  <PollForm />,
  document.getElementById('content')
);


$(document).ready(function(){
    
    $('#addOption').click(function(){
        options.push(options.length + 1);
        console.log(options);
        ReactDOM.render(
            <PollForm />,
            document.getElementById('content')
        );
    })
    
    $('.pollForm').on("submit", function(event){
        event.preventDefault();
        //$('input:text[value=""]', '#pollForm').remove();
        //var data = $("#pollForm :input[value!='']").serialize();
        //var data = $(this).serialize();
        var data = $("#pollForm input").filter(function () {
            return !!this.value;
        }).serialize();
        console.log(data);
        $.post('https://basejump2-jondcoleman.c9.io/api/polls', data);
        this.reset();
        initialize();
        ReactDOM.render(
            <PollForm />,
            document.getElementById('content')
        );
    })
    
    
})