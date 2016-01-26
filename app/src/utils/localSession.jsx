module.exports = function(){
  var votedPolls = sessionStorage.getItem('votedPolls')

  this.addVotedPoll = function(pollId){
    if (!votedPolls) {
      sessionStorage.setItem('votedPolls', JSON.stringify([pollId]))
    } else {
      var polls = JSON.parse(votedPolls)
      polls.push(pollId)
      sessionStorage.setItem('votedPolls', JSON.stringify(polls))
    }
  },

  this.checkVotedPoll = function(pollId){
    var returnVal
    if (votedPolls) {
      return JSON.parse(votedPolls).indexOf(pollId) < 0 ? false : true
    } else {
      return false
    }
  }
}
