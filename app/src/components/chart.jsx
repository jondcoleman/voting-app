var React = require('react');
var Input = require('react-bootstrap').Input;
var Chart = require('chart.js');

Chart.defaults.global.responsive = true;

module.exports = React.createClass({
  componentDidMount: function() {
    this.doChartThings()
  },
  componentWillUpdate: function(){
    this.doChartThings()
  },
  render: function() {
    return (
      <canvas id={"Chart" + this.props.poll._id} width="600" height="250"></canvas>
    )
  },
  doChartThings: function(){
    var dataset = this.props.poll.options
    var chartLabels = dataset.map(function(item) {
      if (item.optionName.length > 20) {
        return item.optionName.substring(0, 20) + "..."
      } else {
        return item.optionName;
      }
    })
    var chartData = dataset.map(function(item) {
      return item.votes;
    })
    var options = {
      scaleShowGridLines : false
    }
    var data = {
      labels: chartLabels,
      datasets: [
        {
          data: chartData,
          fillColor: 'yellow'
        }

      ]
    };

    var ctx = document.getElementById("Chart" + this.props.poll._id).getContext("2d");
    var myBarChart = new Chart(ctx).Bar(data, options);
    myBarChart.datasets[0].bars.forEach(function(bar) {
      var color = getRandomColor();
      bar.fillColor = color
      bar.highlightFill = color
      bar.strokeColor = color
      bar.highlightStroke = color
    })
    myBarChart.update()

    //idea credit: http://stackoverflow.com/questions/25594478/different-color-for-each-bar-in-a-bar-chart-chartjs

    function getRandomColor() {
      var letters = '0123456789ABCDEF'.split('')
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  }
})
