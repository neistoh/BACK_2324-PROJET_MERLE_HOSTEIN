const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbManager = require('../MongoDB/dbManager')
const event = require("../model/event");

/**
 * Renvois les droits de l'utilisateur
 */
router.post('/', async (req, res) => {
    console.log(req.body);
    if (req.body.jwt) {
        jwt.verify(req.body.jwt, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                res.json({error: err});
            } else {
                res.json({index: "user", droits: "W", jwt: req.body.jwt});
            }
        })
    } else {
        const jwtSign = generateAccessToken({username: req.body.nickname});
        res.json({index: "user", droits: "W", jwt: jwtSign});
    }
});

function generateAccessToken(username) {
    process.env.TOKEN_SECRET = require('crypto').randomBytes(64).toString('hex');
    return jwt.sign(username, process.env.TOKEN_SECRET, {expiresIn: '1800s'});
}

router.get('/accueil', async (req, res) => {
    let eventData = await event.getAllEvents(dbManager.getDBname(), dbManager.getClient());
    res.json({eventsData: eventData})
})

module.exports = router;