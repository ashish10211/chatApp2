var express = require('express');
var socket = require('socket.io');

var app = express();


server = app.listen(8080, function(){
    console.log('server is running on port 5000')
});

io = socket(server);

io.on('connection', (socket) => {
	
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
        console.log(data); //message receieved from client

    })

});

io.on('connection', function(client) {
console.log('Client connected...');

client.on('join', function(data) {
        console.log(data);
        io.emit('SERVER_MESSAGES', data);  //this  sending data from server to client
    });
});

