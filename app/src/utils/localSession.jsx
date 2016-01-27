module.exports = function(){


  this.addVotedPoll = function(pollId){
    var votedPolls = localStorage.getItem('votedPolls')
    if (!votedPolls) {
      localStorage.setItem('votedPolls', JSON.stringify([pollId]))
    } else {
      var polls = JSON.parse(votedPolls)
      polls.push(pollId)
      localStorage.setItem('votedPolls', JSON.stringify(polls))
    }
  },

  this.checkVotedPoll = function(pollId){
    var votedPolls = localStorage.getItem('votedPolls')
    var returnVal
    if (votedPolls) {
      return JSON.parse(votedPolls).indexOf(pollId) < 0 ? false : true
    } else {
      return false
    }
  }
}
