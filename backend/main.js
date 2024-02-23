const express = require('express');
const path = require("path");
const http = require('http');
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.use('/', express.static(path.join(__dirname, "client"), {index: "index.html"}));

io.on('connection', (socket) => {
    console.log(`New connection. Socket id : ${socket.id}`);
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});