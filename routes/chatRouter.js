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
    try {
        let chatData = await chat.getAllChats(dbManager.getDBname(), dbManager.getClient(), nickname)
        res.json({chats: chatData});
    } catch (err) {
        res.status(400).send({error: err.message})
    }
});

/**
 * Récupère la liste des messages d'un chat
 */
router.get('/:id', async (req, res) => {
    try {
        let chatData = await chat.getChat(dbManager.getDBname(), dbManager.getClient(), req.params.id)
        res.json({messages: chatData});
    } catch (err) {
        res.status(400).send({error: err.message})
    }
});

/**
 * Ajoute un chat dans la collection `chats` de MongoDB
 */
router.post('/createChat/:id', async (req, res) => {
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
    let chat = {
        user1: nickname,
        user2: req.body.dest,
        lastMessage: new Date().toString()
    };
    try {
        let chatData = await chat.createChat(dbManager.getDBname(), dbManager.getClient(), chat)
        res.json({chat: chatData}); //Renvoie true si bien inséré
    } catch (err) {
        res.status(400).send({error: err.message})
    }
});

/**
 * Ajoute un message dans la collection `messages` de MongoDB
 */
router.post('/addMessage/:id', async (req, res) => {
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

    let msg = {
        text: req.body.text,
        chat: req.body.chat,
        user: nickname,
        sentAt: new Date().toString()
    };
    try {
        let chatData = await chat.insertMessage(dbManager.getDBname(), dbManager.getClient(), msg)
        res.json({messages: chatData}); //Renvoie true si bien inséré
    } catch (err) {
        res.status(400).send({error: err.message})
    }
});

module.exports = router;