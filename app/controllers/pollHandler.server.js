'use strict';

var Poll = require('../models/polls.js');
//var User = require('../models/users.js');

function PollHandler () {
    this.addPoll = function (req, res) {
        console.log(req.body);
        var newPoll = new Poll();
        newPoll.pollName = req.body.PollName;
        newPoll.userId = req.user._id;
        req.body.option.map(function(opt){
            newPoll.options.push({optionName: opt, votes:0});
        });
        newPoll.save(function (err) {
            if (err) {
                throw err;
            }
            
            return newPoll;
        });
    };
    
    this.getPolls = function (req, res) {
        Poll
            .find ({ 'userId': req.user._id })
            .exec(function(err, result) {
                if (err) { throw err;}
                res.json(result);
            }
        );
        
    };
};


module.exports = PollHandler;