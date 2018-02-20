var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);


var options = {
      socketOptions: {
                      autoReconnect:true,
                      noDelay: true,
                      keepAlive: 0,
                      connectTimeoutMS:0,
                      socketTimeoutMS:0
                     },
      reconnectTries:30,
      reconnectInterval: 1000,
      monitoring:true,
      haInterval:10000
};

mongoose.connect(config.database, options , function(err){
//mongoose.connect(config.database, { server: { reconnectTries: Number.MAX_VALUE } }, function(err){
// mongoose.connect(config.database, function(err){
  if (err) {
    console.log('No se pudo conectar....');
    console.log(err);
    // mongoose.connect(config.database, options );
    // setTimeout(tryReconnect, 500)
    // setTimeout(connectWithRetry, 5000);
  } else {
    console.log('Dgb Exitos, se pudo conectar a mongo');
  }
});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app, express, io);
app.use('/api', api);

app.get('*', function(req, res){
  res.sendFile(__dirname + "/public/app/views/index.html");
})

http.listen(config.port, function(err){
  if (err) {
    console.log('dgb error');

  } else {
    console.log('Escuchando puerto ');
    console.log(config.port);
  }
});
