const mongoose = require('mongoose');

//map global promisses
//mongoose.Promise = global.Promise;
// mongoose connect
mongoose.connect( "")


.then(()=> console.log('MongoDB Connected'))
.catch(err => console.log(err));
