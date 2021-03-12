const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const API_PORT = process.env.PORT || 8080


app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

const server = app.listen(API_PORT, function () {
  console.log(`Listening on port ${API_PORT}`);
  console.log(`http://localhost:${API_PORT}`);
});

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// Socket setup
const io = socket(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
/*
const io = require("socket.io")(httpServer, );
*/
const activeUsers = new Set();

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("new user", function (data) {
    console.log('new user::', data)
    socket.userId = data;
    activeUsers.add(data);
    io.emit("new user", [...activeUsers]);
    console.log('activeUsers::', activeUsers)
  });

  socket.on("disconnect", () => {
    console.log('disconnect')
    activeUsers.delete(socket.userId);
    io.emit("user disconnected", socket.userId);
  });
});
