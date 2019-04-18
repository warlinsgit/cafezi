const mongoose = require('mongoose');

//map global promisses
//mongoose.Promise = global.Promise;
// mongoose connect
mongoose.connect( "mongodb+srv://warlins123:warlins123@warlins123-wbteo.mongodb.net/pusherpoll2?retryWrites=true")


.then(()=> console.log('MongoDB Connected'))
.catch(err => console.log(err));
