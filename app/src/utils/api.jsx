var Fetch = require('whatwg-fetch');
var Promise = require('es6-promise').Promise;

var rootUrl = '/api/';

module.exports ={
    get: function(url) {
      return fetch(rootUrl + url)
      .then(function(response){
        return response.json();
      })
    }
}
