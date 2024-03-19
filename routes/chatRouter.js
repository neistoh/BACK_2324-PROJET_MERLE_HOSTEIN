const express = require('express');
const router = express.Router();
const dbManager = require('../MongoDB/dbManager');
const chat = require('../model/chat');
const jwt = require("jsonwebtoken");

/**
 * Récupère la liste des chats d'un utilisateur
 */
router.get('/', async (req, res) => {
    let nickname = ""
    if (req.body.jwt) {
        jwt.verify(req.body.jwt, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                res.json({error: err});
            } else {
                nickname = user;
            }
        })
    }
    let chatData = await chat.getAllChats(dbManager.getDBname(), dbManager.getClient(), nickname)
    res.json({chats: chatData});
});

/**
 * Récupère la liste des messages d'un chat
 */
router.get('/:id', async (req, res) => {
    let chatData = await chat.getChat(dbManager.getDBname(), dbManager.getClient(), req.params.id)
    res.json({messages: chatData});
});

/**
 * Ajoute un chat dans la collection `chats` de MongoDB
 */
router.post('/createChat/:id', async (req, res) => {
    let chat = {
        user1: req.body.user1,
        user2: req.body.user2,
        lastMessage: new Date().toString()
    };
    let chatData = await chat.createChat(dbManager.getDBname(), dbManager.getClient(), chat)
    res.json({chat: chatData}); //Renvoie true si bien inséré
});

/**
 * Ajoute un message dans la collection `messages` de MongoDB
 */
router.post('/addMessage/:id', async (req, res) => {
    let msg = {
        text: req.body.text,
        chat: req.body.chat,
        user: req.body.user,
        sentAt: new Date().toString()
    };
    let chatData = await chat.insertMessage(dbManager.getDBname(), dbManager.getClient(), msg)
    res.json({messages: chatData}); //Renvoie true si bien inséré
});

module.exports = router;