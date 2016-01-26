'use strict';

var path = process.cwd();

var PollHandler = require(path + '/app/controllers/pollHandler.server.js');

module.exports = function (app, passport) {

    function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    }

    var pollHandler = new PollHandler();

    app.route('/')
        .get(function (req, res) {
            res.sendFile(path + '/public/index.html');
        });

    app.route('/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });

    app.route('/api/my-polls')
        .get(isLoggedIn, pollHandler.getUserPolls);

    app.route('/api/polls')
        .get(pollHandler.getPolls)
        .post(isLoggedIn, pollHandler.addOrUpdatePoll);

    app.route('/api/poll/:id/:option')
        .put(pollHandler.addVote);

    app.route('/api/poll/:id')
        .get(pollHandler.getPoll)
        .delete(isLoggedIn, pollHandler.deletePoll)

    app.route('/polls/:id')
         .get(function(req, res) {
            res.render('poll', {_id : req.params.id});
         });

    app.route('/api/user')
        .get(function (req, res) {
            req.user ? res.json(req.user.github) : res.status(204).send();
        });

    app.route('/auth/github/callback')
        .get(passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/'
        }));

};
