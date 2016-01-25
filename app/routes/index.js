'use strict';

var path = process.cwd();

var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');

module.exports = function (app, passport) {

    function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    }

    var clickHandler = new ClickHandler();
    var pollHandler = new PollHandler();

    app.route('/')
        .get(function (req, res) {
            console.log(req.sessionID);
            res.sendFile(path + '/public/index.html');
        });

    // app.route('/login')
    //     .get(function (req, res) {
    //         res.sendFile(path + '/public/login.html');
    //     });

    app.route('/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });

    app.route('/profile')
        .get(isLoggedIn, function (req, res) {
            res.sendFile(path + '/public/profile.html');
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

    app.route('/api/:id/clicks')
        .get(isLoggedIn, clickHandler.getClicks)
        .post(isLoggedIn, clickHandler.addClick)
        .delete(isLoggedIn, clickHandler.resetClicks);


};
