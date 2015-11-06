'use strict';

var PollForm = React.createClass({displayName: "PollForm",
    getInitialState: function() {
        return {data: [1,2]};
    },
    render: function() {
        return (
          React.createElement("form", {action: "", className: "pollForm", id: "pollForm", onSubmit: this.handleSubmit}, 
            React.createElement("div", {className: "poll-title"}, 
                React.createElement("h4", null, "Poll Name")
            ), 
            React.createElement("div", null, 
              React.createElement("input", {type: "text", name: "PollName", id: "pollName", className: "input-field", placeholder: "What is your favorite FCC Bonfire?"})
            ), 
            React.createElement("div", null, 
              React.createElement("h4", {className: "poll-title"}, "Options")
            ), 
            React.createElement("div", {id: "options"}, 
              React.createElement(PollOption, {data: this.state.data})
            ), 
            React.createElement("div", {id: "addOption", className: "btn btn-primary poll-buttons", onClick: this.handleClick}, "Add Option"), 
            React.createElement("div", null, 
              React.createElement("input", {type: "submit", value: "Post", className: "btn btn-success poll-buttons"})
            ), 
            React.createElement("div", {id: "validation-msg"}), 
            React.createElement("div", {id: "success-msg", hidden: true}, "Poll Created - View your polls on ", React.createElement("a", {href: "/my-polls"}, "My Polls"))
          )
        );
    },
    handleClick: function(){
        this.state.data.push(this.state.data.length + 1);
        this.setState({data:this.state.data});
    },
    handleSubmit: function(e){
        e.preventDefault();
        
        var validation = $('#validation-msg');
        var success = $('#success-msg');
        var name = $('#pollName');
        var formOptions = $('.input-option');
        
        validation.text('');
        success.hide();
        
        //validation
        if (name[0].value == '') {
            validation.text("Title Is Required")
            return;
        }
        if (formOptions[0].value == '' || formOptions[1].value == '') {
            validation.text("Options 1 & 2 are Required at a Minimum")
            return;
        }
        
        //success
        var data = $("#pollForm input").filter(function () {
            return !!this.value;
        });
        $.post('https://basejump2-jondcoleman.c9.io/api/polls', data.serialize());
        success.show();
        
        //reset
        this.setState(this.getInitialState());
        document.getElementById('pollForm').reset()
        
    }
});

var PollOption = React.createClass({displayName: "PollOption",
    
    render: function() {
        var optionDivs = this.props.data.map(function(option){
            var optionPlaceholder = "Option " + option.toString();
            return (
                    React.createElement("div", {key: option}, 
                        React.createElement("input", {type: "text", name: "option", className: "input-field input-option", placeholder: optionPlaceholder})
                    )
            )
        })
        return (
            React.createElement("div", null, 
                optionDivs
            )
            )
    }
})

ReactDOM.render(
  React.createElement(PollForm, null),
  document.getElementById('content')
);