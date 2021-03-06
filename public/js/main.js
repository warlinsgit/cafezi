
/* global Headers */
 /* global CanvasJS */
  /* global Pusher */
   /* global fetch */


const form = document.getElementById('vote-form');
// Form submit event
form.addEventListener('submit', e => {
  const choice = document.querySelector('input[name=cafe]:checked').value;
  const data = {cafe: choice};

//  fetch('http://localhost:3000/poll', {
    fetch('/poll', {
    method: 'post',
    body: JSON.stringify(data),
    headers: new Headers ({
      'Content-Type': 'application/json'

    })
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));


  e.preventDefault();
});

fetch("/poll")
.then(res => res.json())
.then(data => {

  //console.log(data);
  const votes = data.votes;
  const totalVotes = votes.length;
  //count vote points for each one - accumulate current value
 const voteCounts = votes.reduce(
            (acc, vote) => (
             (acc[vote.cafe] = (acc[vote.cafe] || 0) +
             parseInt(vote.points)), acc),
                      );
             let dataPoints = [
               {label: 'Espresso', y: voteCounts.Espresso },
               {label: 'Americano', y: voteCounts.Americano },
               {label: 'Macchiato', y: voteCounts.Macchiato },
                {label: 'Flat White', y: voteCounts.FlatWhite },
               {label: 'Cappuccino', y: voteCounts.Cappuccino },
               {label: 'Cafee Latte', y: voteCounts.CaffeeLatte }
             ];

             const chartContainer = document.querySelector('#chartContainer');
             if(chartContainer){
               const chart = new CanvasJS.Chart('chartContainer', {
                 animationEnabled: true,
                 theme: 'dark1',
                 title: {
                   text: 'All Votes ' + totalVotes
                 },
                 data: [
                   {
                     type: 'column',
                     dataPoints: dataPoints

                   }
                 ]
               });
               chart.render();

               // Enable pusher logging - don't include this in production
                 Pusher.logToConsole = true;

                 var pusher = new Pusher('b9d758f152fe2b0371ba', {
                   cluster: 'eu',
                   forceTLS: true
                 });

                 var channel = pusher.subscribe('cafe-poll');
                 channel.bind('cafe-vote', function(data) {
                   //alert(JSON.stringify(data));

                   //add data to the chart
                   dataPoints = dataPoints.map(x => {
                     if(x.label == data.cafe){
                       x.y += data.points;
                       return x;
                     }else{
                       return x;
                     }
                   });
                   chart.render();
                 });
             }

        });
