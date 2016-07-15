/*
	---- HoloPaint ----
	A holographic drawing app
	Created by Nathan Piercy
	Copyright (C) 2016
*/

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', 1337);
app.use(express.static(__dirname + '/www'));

http.listen(app.get('port'), function(){
	console.log('listening on port ' + app.get('port'));
});

var clientWidth = 0;

io.on('connection', function(socket){
	console.log('connected: ' + socket.handshake.address);

	socket.on('disconnect', function(){
		console.log('disconnected: ' + socket.handshake.address);
	});

	socket.on('setWidth', function(width){
		clientWidth = width;
		socket.broadcast.emit('setWidth', clientWidth);
		console.log('width set to ' + width);
	});

	socket.on('getWidth', function(){
		socket.emit('setWidth', clientWidth);
	});

	socket.on('draw', function(line){
		socket.broadcast.emit('draw', line);
	});
});