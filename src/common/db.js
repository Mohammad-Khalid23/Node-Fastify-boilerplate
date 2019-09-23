const mongoose = require('mongoose');
// mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true });


mongoose.connection.on('connected', (db) =>{
    console.log('Connected to the Database');
    var collections = mongoose.connections[0].collections;
    var names = [];
  
    Object.keys(collections).forEach(function (k) {
      names.push(k);
    });
  
    console.log(names);
});

mongoose.connection.on('error', (error) =>{
    console.log(error, 'error');
});
mongoose.connection.on('disconnected', () =>{
    console.log('disconnected with database');
});