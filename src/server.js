var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const state = require('./store')
app.get('/', function (req, res) {
  res.send(state);
});

io.on('connection', function (socket) {
  socket.on('channel', function (msg) {
    io.emit('channel', msg);
  });
});

http.listen(4000, function () {
  console.log('listening on *:4000');
});
