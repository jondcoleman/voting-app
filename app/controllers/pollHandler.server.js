'use strict';

var Poll = require('../models/polls.js');
var mongoose = require('mongoose');
//var User = require('../models/users.js');

function PollHandler() {
  this.addOrUpdatePoll = function(req, res){
    if (req.body._id) {
      var newOptions = req.body.options.map(function(option){
        option.votes === undefined ? option.votes = [] : null
        return option
      })
      Poll.findOneAndUpdate({
          _id: req.body._id
        }, {
          $set: {
            pollName: req.body.pollName,
            options: newOptions,
          }
        }, {
          new: true
        },
        function(err, doc) {
          res.json(err || doc)
        }
      )
    } else {
      var newPoll = new Poll();
      newPoll.pollName = req.body.pollName;
      newPoll.userId = req.user._id;
      req.body.options.map(function(option) {
        newPoll.options.push({
          optionName: option.optionName,
          votes: []
        });
      });
      newPoll.save(function(err) {
        if (err) {
          throw err;
        }
        res.json(newPoll);
      });
    }
  };

  this.getUserPolls = function(req, res) {
    Poll
      .find({
        'userId': req.user._id
      })
      .exec(function(err, result) {
        if (err) {
          throw err;
        }
        res.json(result);
      });

  };

  this.getPolls = function(req, res) {
    Poll
      .find({})
      .exec(function(err, result) {
        if (err) {
          throw err;
        }
        res.json(result);
      });
  }

  this.getPoll = function(req, res) {
    Poll
      .findOne({
        '_id': req.params.id
      })
      .exec(function(err, result) {
        if (err) {
          throw err;
        }

        res.json(result);
      });
  }

  this.deletePoll = function(req, res) {
    Poll
      .remove({
        '_id': req.params.id
      }, function(err) {
        if (err) {
          res.json({
            message : err
          })
        }
        res.json({
          message: 'Successfully deleted'
        });
      });
  }

  this.addVote = function(req, res) {
    Poll.findById(req.params.id, function(err, poll) {
      if (err) {
        res.json({
          error: err
        })
      }
      var option = poll.options[req.params.option]
      console.log(req.sessionID, option);
      if (option.votes.indexOf(req.sessionID) >= 0 || (req.user && option.votes.indexOf(req.user._id) >= 0)) {
        console.log('already voted')
        res.json({
          message: 'You already voted!'
        })
      } else {
        poll.options[req.params.option].votes.push(req.sessionID);

        poll.save(function(err) {
          if (err) {
            res.json({
              message: err
            })
          }

          res.json({
            message: 'Vote Added!'
          })
        })
      }
    })
  }
};


module.exports = PollHandler;
