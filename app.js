const express = require('express');
const path = require("path");
const http = require('http');
const cors = require('cors');

const chatRouter = require(path.join(__dirname, "/routes/chatRouter"));
const eventRouter = require(path.join(__dirname, "/routes/eventRouter"));
const userRouter = require(path.join(__dirname, "/routes/userRouter"));

const dbManager = require('./MongoDB/dbManager');
const chat = require("./model/chat")
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

//const io = new io(server);
const port = 10000;

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
    socket.on('getChat', async (id, callback) => {
        console.log("Get Chat");
        const reponse = await chat.getChat(dbManager.getDBname(), dbManager.getClient(), id);
        callback(reponse)
    });

    /**
     * Create a chat
     */
    socket.on('createChat', (chatOn) => {
        io.emit(chat.createChat(dbManager.getDBname(), dbManager.getClient(), chatOn));
    });

    /**
     * Add a message in a chat
     */
    socket.on("postMessage", (msg) => {
        console.log(msg);
        chat.insertMessage(dbManager.getDBname(), dbManager.getClient(), msg);
    })
});

app.use("/chat", chatRouter);
app.use("/event", eventRouter);
app.use("/user", userRouter);

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});