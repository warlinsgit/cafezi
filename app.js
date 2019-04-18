const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // let a user agent gain permission to access selected resources  from a server on a different origin.

//db config
require('./config/db');




const app = express();
const poll = require('./routes/poll');
//set public folder


app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//enable cors

app.use(cors());

app.use('/poll', poll);
/*
app.get('/poll', function(req, res) {
    console.log("GET the file");
    res
        .status(200)
        .sendFile(path.join(__dirname, 'app.js'));
});
*/

//const port = 3000;
//var port = process.env.PORT || 5000;

var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});

//app.listen(port, () => console.log('Server started on port ${port}'));
