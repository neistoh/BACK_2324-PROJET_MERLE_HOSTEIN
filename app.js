const express = require('express');
const path = require("path");
const http = require('http');
const {Server} = require("socket.io");
const cors = require('cors');

const chatRouter = require(path.join(__dirname, "/routes/chatRouter"));
const eventRouter = require(path.join(__dirname, "/routes/eventRouter"));
const userRouter = require(path.join(__dirname, "/routes/userRouter"));

const dbManager = require('./MongoDB/dbManager');
const chat = require("./model/chat")

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(express.json());

io.on('connection', (socket) => {
    console.log(`New connection. Socket id : ${socket.id}`);
    /**
     * If a user disconnect
     */
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    /**
     * Return all chats of a user
     */
    socket.on('getAllChats', (nickname) => {
        io.emit(chat.getAllChats(dbManager.getDBname(), dbManager.getClient(), nickname))
    });

    /**
     * Return the messages of a chat
     */
    socket.on('getChat', (id) => {
        io.emit(chat.getChat(dbManager.getDBname(), dbManager.getClient(), id));
    });

    /**
     * Create a chat
     */
    socket.on('createChat', (chat) => {
        io.emit(chat.createChat(dbManager.getDBname(), dbManager.getClient(), chat));
    });

    /**
     * Add a message in a chat
     */
    socket.on("postMessage", (msg) => {
        io.emit(chat.insertMessage(dbManager.getDBname(), dbManager.getClient(), msg))
    })
});

app.use("/chat", chatRouter);
app.use("/event", eventRouter);
app.use("/user", userRouter);

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});