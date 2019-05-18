const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Vote = require('../models/Vote');
const Pusher = require('pusher');

/* global Headers */
 /* global CanvasJS */
  /* global Pusher */

var pusher = new Pusher({
  appId: '754475',
  key: 'b9d758f152fe2b0371ba',
  secret: '7192a766d76c33c92019',
  cluster: 'eu',
  encrypted: true
});

router.get('/', (req, res) => {
  Vote.find().then(votes => res.json({success: true,
  votes: votes}));
});



router.post('/', (req, res) => {

  const newVote = {
    cafe: req.body.cafe,
    points: 1
  }

   new Vote(newVote).save().then(vote => {

     pusher.trigger('cafe-poll', 'cafe-vote', {
       points: parseInt(vote.points),
       cafe: vote.cafe

   });
   return res.json({success: true, message: 'Thank you for your voting'});

   }) ;

});

module.exports = router;
