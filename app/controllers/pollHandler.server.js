'use strict';

var Poll = require('../models/polls.js');
//var User = require('../models/users.js');

function PollHandler () {
    this.addPoll = function (req, res) {
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
    
    this.getPoll = function (req, res) {
        Poll
            .findOne ({'_id': req.params.id})
            .exec(function (err, result) {
                if (err) { throw err; }

                res.json(result);
            });
    }
    
    this.deletePoll = function (req, res) {
        Poll
            .remove({'_id' : req.params.id }, function (err) {
                if (err) {res.send(err)}
                
                res.json({ message: 'Successfully deleted' });
            });
    }
    
    this.addVote = function (req, res) {
        Poll.findById(req.params.id, function(err, poll){
            if (err) {res.send(err)}
            
            poll.options[req.params.option].votes += 1;
            
            poll.save(function(err){
                if (err) {res.send(err)}
                
                res.json({ message: 'Vote Added!' })
            })
        })
    }
};


module.exports = PollHandler;