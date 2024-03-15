const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbManager = require('../MongoDB/dbManager')
const event = require("../model/event");

//TODO : Logique
// / : vérif de token JWT
// Si pas de token JWT, redirection vers /login
// /login : connexion ou création d'un compte
// Si token, redirection vers /accueil
// /accueil : page principale, liste les évents récupérés en base

/**
 * Renvois les droits de l'utilisateur et les
 */
//TODO: ajout du check des droits avec Mongo et si la session n'existe pas
router.post('/', async (req, res) => {
    console.log(req.body);
    if (req.body.jwt) {
        jwt.verify(req.body.jwt, process.env.TOKEN_SECRET, async (err, user) => {
            if (err) {
                console.log(err);
            } else {
                let eventData = await event.getEvent(dbManager.getDBname(),dbManager.getClient());
                res.json({index: "user", droits: "W", jwt: req.body.jwt, evtData: eventData});
            }
        })
    } else {
        let eventData = await event.getEvent(dbManager.getDBname(),dbManager.getClient());
        const jwtSign = generateAccessToken({username: req.body.nickname});
        res.json({index: "user", droits: "W", jwt: jwtSign, evtData: eventData});
    }
});

function generateAccessToken(username) {
    process.env.TOKEN_SECRET = require('crypto').randomBytes(64).toString('hex');
    return jwt.sign(username, process.env.TOKEN_SECRET, {expiresIn: '1800s'});
}

module.exports = router;