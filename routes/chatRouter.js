const express = require('express');
const router = express.Router();
const dbManager = require('../MongoDB/dbManager');
const chat = require('../model/chat');
const jwt = require("jsonwebtoken");

//TODO : Logique
// /chat : Récupérer la liste des conversations et les afficher
// si clic sur la conversation XXXXXXXX, rediriger vers /chat/XXXXXXXX ?
// /chat/XXXXXXXX : récupérer tous les messages de la conversation et les afficher

router.get('/', async (req, res) => {
    let username = ""
    if (req.body.jwt) {
        jwt.verify(req.body.jwt, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                username = user;
            }
        })
    }
    let chatData = await chat.getAllChats(dbManager.getDBname(), dbManager.getClient(), username)
    res.json(chatData);
});

router.get('/:chatId', async (req, res) => {
    let eventData = await chat.getChat(dbManager.getDBname(), dbManager.getClient(), req.params.chatId)
    res.json(eventData);
});

module.exports = router;