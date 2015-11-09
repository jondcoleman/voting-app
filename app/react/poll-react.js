'use strict';

var PollForm = React.createClass({
    getInitialState: function() {
        return {data: [1,2]};
    },
    render: function() {
        return (
          <form action="" className="pollForm" id="pollForm" onSubmit={this.handleSubmit} >
            <div className="poll-title">
                <h4>Poll Name</h4>
            </div>
            <div>
              <input type="text" name="PollName" id="pollName" className="input-field" placeholder="What is your favorite FCC Bonfire?" />
            </div>
            <div>
              <h4 className="poll-title">Options</h4>
            </div>
            <div id="options">
              <PollOption data={this.state.data}/>
            </div>
            <div id="addOption" className="btn poll-buttons" onClick={this.handleClick}>Add Option</div>
            <div>
              <input type="submit" value="Post" className="btn poll-buttons" />
            </div>
            <div id='validation-msg'></div>
            <div id='success-msg' hidden>Poll Created - View your polls on <a href="/my-polls">My Polls</a></div>
          </form>
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

var PollOption = React.createClass({
    
    render: function() {
        var optionDivs = this.props.data.map(function(option){
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