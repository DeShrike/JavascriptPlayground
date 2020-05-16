var express = require("express");

var app = express();
var server = app.listen(3000);

app.use(express.static("public"));

console.log("Running on port 3000");

var socket = require("socket.io");

var io = socket(server);

io.sockets.on("connection", newConnection);

function newConnection(socket) {
  console.log("New connection: " + socket.id);
  // console.log(socket);

  socket.on("mousemsg", mouseMsg);

  function mouseMsg(data)
  {
    socket.broadcast.emit("mousemsg", data);
    // io.sockets.emit("mousemsg", data);
  }
}
