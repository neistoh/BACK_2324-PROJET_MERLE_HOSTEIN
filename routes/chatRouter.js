const express = require('express');
const router = express.Router();
const dbManager = require('../MongoDB/dbManager');
const chat = require('../model/chat');
const jwt = require("jsonwebtoken");

router.get('/', async (req, res) => {
    let username = ""
    if (req.body.jwt) {
        jwt.verify(req.body.jwt, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                res.json({error: err});
            } else {
                username = user;
            }
        })
    }
    let chatData = await chat.getAllChats(dbManager.getDBname(), dbManager.getClient(), username)
    res.json({chats: chatData});
});

router.get('/:chatId', async (req, res) => {
    let chatData = await chat.getChat(dbManager.getDBname(), dbManager.getClient(), req.params.chatId)
    res.json({messages: chatData});
});

module.exports = router;