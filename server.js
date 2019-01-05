#!/usr/bin/env node

/**
 * Module dependencies.
 */

const PORT = process.env.PORT || 3000;
var app = require('./app');
app.set(PORT);
var http = require('http').createServer(app);
var debug = require('debug')('people-go');

// const server = app.listen(3000, function() {
//     console.log('server running on port 3000');
// });

// var server = require('http').Server(app);
var io = require('socket.io')(http);


// listen for incoming connections from client
io.on('connection', function (socket) {
    console.log("Someone connected");

    socket.on('disconnect', function(){
        console.log("Someone Disconnected");
    });

    // start listening for coords
    socket.on('coords', function (data) {
  

        io.emit('coords', data);
    });
    // start listening for logout
    socket.on('logout', function(data) {


        io.emit('logout', data)
    });
    // starts listening for a match being initialized
    socket.on('match-made', function(data) {

        io.emit('match-made', data)
    });
    // starts listening for leaving a match
    socket.on('match-left', function(data) {

        io.emit('match-left', data)
    });
    // starts listening for deleting a match
    socket.on('match-deleted', function(data) {

        io.emit('match-deleted', data)
    });
    // starts listening for entering a match
    socket.on('match-joined', function(data) {

        io.emit('match-joined', data)
    });
  });


http.listen(PORT);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
