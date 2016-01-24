'use strict';

var Poll = require('../models/polls.js');
//var User = require('../models/users.js');

function PollHandler () {
    this.addPoll = function (req, res) {
        if(req.body._id){
          var docId = req.body._id
        } else {
          var docId = Schema.ObjectId();
        }

        console.log(docId);
        Poll
          .findOneAndUpdate(
            { _id : req.body._id },
            {$set : {
              pollName : req.body.pollName,
              options : req.body.options,
              userId: req.user._id
            }},
            { upsert : true, new: true },
            function(err, doc){
              console.log(err || doc);
            }
          )


        // var newPoll = new Poll();
        // newPoll.pollName = req.body.pollName;
        // newPoll.userId = req.user._id;
        // req.body.options.map(function(option){
        //     newPoll.options.push({optionName: option.optionName, votes:0});
        // });
        // newPoll.save(function (err) {
        //     if (err) {
        //         throw err;
        //     }
        //
        //     return newPoll;
        // });
    };

    this.getUserPolls = function (req, res) {
        Poll
            .find ({ 'userId': req.user._id })
            .exec(function(err, result) {
                if (err) { throw err;}
                res.json(result);
            }
        );

    };

    this.getPolls = function (req, res) {
      Poll
          .find ({})
          .exec(function(err, result) {
              if (err) { throw err;}
              res.json(result);
          }
      );
    }

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
            if (req.session.votes.indexOf(req.params.id) >= 0){
                res.json({message: 'You already voted!'})
            } else {
                poll.options[req.params.option].votes += 1;
                req.session.votes.push(req.params.id);
                console.log(req.session.votes);

                poll.save(function(err){
                    if (err) {res.send(err)}

                    res.json({ message: 'Vote Added!' })
                })
            }
        })
    }
};


module.exports = PollHandler;
