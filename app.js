var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var unirest = require('unirest');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var johnnyFive = require('johnny-five');
var Particle = require("particle-io");
var board = new Particle({
  token: "",
  deviceId: ""
});

console.log(board);

app.locals.delimiters = '[[ ]]'; 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
http.listen(3000, function () {
  console.log("http port working");
});
// mongoose.connect('');
var Comm = mongoose.model( 'message' , new mongoose.Schema({}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

io.on('connection', function (socket) {
  console.log("socket io is working. My Id is: "+socket.id);
  socket.emit('johnny', johnnyFive);
  // Comm.find({_id : myId }).remove( function (err,doc) {
  //     // res.status(200).end();
  //     socket.emit('Delete Message', doc);
  //   }); 
  // app.post('/saveTemplate', function (req, res) {
  //   var newContent      = req.body.html;
  //   var tempURL         = req.body.iframeSRC;
  //   fs.writeFileSync("public/"+tempURL, newContent);
  //   res.redirect("/");
  // });
  // socket.on('New Template', function (data){
  //   var newTemp = data;
  //   var newComm = new Comm(newTemp)
  //     .save(function (err, doc) { err ? res.send(err) : socket.emit('New Template', doc) });  
  // });
  // app.get('/data', function (req, res) {
  //   Comm.find(function(err,data){
  //     res.json(data);
  //   });
  // });

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  module.exports = app;

});
  

