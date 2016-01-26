module.exports = function(){
  var votedPolls = sessionStorage.getItem('votedPolls')

  this.addVotedPoll = function(pollId){
    if (!votedPolls) {
      sessionStorage.setItem('votedPolls', [pollId])
    } else {
      votedPolls.push(pollId)
    }
  },

  this.checkVotedPoll = function(pollId){
    return votedPolls.indexOf(pollId) < 0 ? false : true;
  }
}
