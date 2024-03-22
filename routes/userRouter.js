const express = require('express');
const router = express.Router();
const dbManager = require('../MongoDB/dbManager');
const jwt = require('jsonwebtoken');
const user = require('../model/user');
const multer = require("multer");
const {memoryStorage} = require("multer");

// Set up multer storage configuration
const storage = memoryStorage();
const upload = multer({storage: storage});

/**
 * Récupère les infos d'un utilisateur
 */
router.get('/', async (req, res) => {
    try {
        let nickname = ""
        if (req.query.jwt) {
            jwt.verify(req.query.jwt, process.env.TOKEN_SECRET, (err, user) => {
                if (err) {
                    res.json({error: err});
                } else {
                    nickname = user.username;
                }
            })
        }else if(req.query.nickname){
            nickname = req.params.nickname;
        }
        let userData = await user.getUser(dbManager.getDBname(), dbManager.getClient(), nickname)
        res.json({eventData: userData});
    } catch (err) {
        res.status(400).send({error: err.message})
    }
});

/**
 * Récupère les évènements favoris d'un utilisateur
 */
router.get('/getFavorites', async (req, res) => {
    try {
        let nickname = ""
        if (req.body.jwt) {
            jwt.verify(req.body.jwt, process.env.TOKEN_SECRET, (err, user) => {
                if (err) {
                    res.json({error: err});
                } else {
                    nickname = user.username;
                }
            })
        }
        let userData = await user.getFavorites(dbManager.getDBname(), dbManager.getClient(), nickname)
        res.json({usr: userData});
    } catch (err) {
        res.status(400).send({error: err.message})
    }
});

/**
 * Ajoute un évènement aux favoris d'un utilisateur
 */
router.post('/addFavorites', async (req, res) => {
    try {
        let nickname = ""
        if (req.body.jwt) {
            jwt.verify(req.body.jwt, process.env.TOKEN_SECRET, (err, user) => {
                if (err) {
                    res.json({error: err});
                } else {
                    nickname = user.username;
                }
            })
        }

        let userData = await user.addFavorites(dbManager.getDBname(), dbManager.getClient(), nickname, req.body.eventId)
        res.json({usr: userData});
    } catch (err) {
        res.status(400).send({error: err.message})
    }
});

/**
 * Ajoute un utilisateur dans la collection `users` de MongoDB
 */
router.post('/addUser', upload.single('image'), async (req, res) => {
    try {
        console.log('Là')
        const pwd = await user.hashPassword(req.body.password);
        console.log(req.body)
        await user.insertUser(dbManager.getDBname(), dbManager.getClient(), {
            "nickname": req.body.nickname,
            "mail": req.body.mail,
            "password": pwd,
            "name": req.body.name,
            "firstname": req.body.firstname,
            "birthdate": req.body.birthdate,
            "avatar": req.body.avatar
        })
        console.log('Ici');
        res.send({eventData:true});
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.post('/connect',
    async (req, res) => {
        if (req.body.jwt) {
            jwt.verify(req.body.jwt, process.env.TOKEN_SECRET, (err, user) => {
                if (err) {
                    if (err.message === "invalid signature") {
                        res.status(401).json({error: err, action: "removeJwt"});
                        return;
                    }
                    console.log(err);
                    res.status(401).json({error: err});
                } else {
                    res.json({index: "user", droits: "W", jwt: req.body.jwt});
                }
            })
        } else {
            //Check si user exist et a le bon mot de passe, sinon on renvoie un 201
            if (req.body.nickname) {
                let userData = await user.getUser(dbManager.getDBname(), dbManager.getClient(), req.body.nickname);
                console.log(userData);
                if (userData.length > 0) {
                    const isPasswordValid = await user.checkPasswordValidity(req.body.password, userData[0].password);
                    if (!isPasswordValid) {
                        res.status(401).json({error: "badPassword", action: "badPassword"});
                        return;
                    }
                } else {
                    res.status(401).json({error: "badPassword", action: "badPassword"});
                    return;
                }
                const jwtSign = user.generateAccessToken({username: req.body.nickname})
                res.json({index: "user", droits: "W", jwt: jwtSign});
                return;
            }
            res.status(401).json({error: "badPassword", action: "badPassword"});
        }
    });

module.exports = router;