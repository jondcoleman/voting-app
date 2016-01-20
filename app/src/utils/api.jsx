var Fetch = require('whatwg-fetch');
var Promise = require('es6-promise').Promise;

var rootUrl = '/api/';

module.exports = {
  get: function(url) {
    var options = {
      credentials: 'same-origin'
    }
    return fetch(rootUrl + url, options).then(function(response) {
      if (response.status !== 200) {
        console.log('not a good response');
        return;
      }
      return response.json().then(function(json) {
        return json;
      })
    })
  },
    post: function(url) {
      var options = {
        method: 'POST'
      };
      return fetch(rootUrl + url, options).then(function(response) {
        return response.json();
      })
    }
  }
