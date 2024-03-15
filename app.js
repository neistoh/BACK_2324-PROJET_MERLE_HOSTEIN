const express = require('express');
const path = require("path");
const http = require('http');
const {Server} = require("socket.io");
const cors = require('cors');

const chatRouter = require(path.join(__dirname, "/routes/chat"));
const indexRouter = require(path.join(__dirname, "/routes/index"));
const eventRouter = require(path.join(__dirname, "/routes/event"));
const userRouter = require(path.join(__dirname, "/routes/user"));

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());

io.on('connection', (socket) => {
    console.log(`New connection. Socket id : ${socket.id}`);
});

app.use("/", indexRouter);
app.use("/chat", chatRouter);
app.use("/event", eventRouter);
app.use("/user", userRouter);

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});