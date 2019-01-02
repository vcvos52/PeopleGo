#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var http = require('http').Server(app);
var debug = require('debug')('people-go');

// const server = app.listen(3000, function() {
//     console.log('server running on port 3000');
// });

// var server = require('http').Server(app);
var io = require('socket.io')(http);


// listen for incoming connections from client
io.on('connection', function (socket) {
    console.log("Someone connected");
    // start listening for coords
    socket.on('coords', function (data) {
  
        // broadcast your coordinates to everyone except you
        io.emit('coords', data);
    });
  });


http.listen(3000, () => console.log('listening on port 3000'));