const express = require('express');
const path = require("path");
const http = require('http');
const {Server} = require("socket.io");

const indexRouter = require(path.join(__dirname, "/routes/index"));

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

io.on('connection', (socket) => {
    console.log(`New connection. Socket id : ${socket.id}`);
});

app.use("/", indexRouter);

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});