const express = require('express');
const router = express.Router();
const dbManager = require('../MongoDB/dbManager')
const jwt = require('jsonwebtoken');
const user = require('../model/user')
const multer = require("multer");
const {memoryStorage} = require("multer");

// Set up multer storage configuration
const storage = memoryStorage();
const upload = multer({storage: storage});

/**
 * Récupère les infos d'un utilisateur
 */
router.get('/user', async (req, res) => {
    try {
        let userData = await user.getUser(dbManager.getDBname(), dbManager.getClient(), req.body.nickname)
        res.json({usr: userData});
    } catch (err) {
        res.status(400).send({error: err.message})
    }
});

/**
 * Récupère les évènements favoris d'un utilisateur
 */
router.get('/getFavorites', async (req, res) => {
    try {
        let userData = await user.getFavorites(dbManager.getDBname(), dbManager.getClient(), req.body.nickname)
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
        let userData = await user.addFavorites(dbManager.getDBname(), dbManager.getClient(), req.body.nickname, req.body.eventId)
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
        let imageBase64;
        const pwd = await user.hashPassword(req.body.password);
        if (req.file) imageBase64 = req.file.buffer.toString('base64');
        await user.insertUser(dbManager.getDBname(), dbManager.getClient(), {
            nickname: req.body.nickname,
            mail: req.body.mail,
            pwd: pwd,
            name: req.body.name,
            firstName: req.body.firstName,
            birthDate: req.body.birthDate,
            avatar: {
                filename: req.file.originalname,
                contentType: req.file.mimetype,
                data: imageBase64,
            }
        })
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.post('/connect',
    async (req, res) => {
        if(req.body.jwt){
            jwt.verify(req.body.jwt, process.env.TOKEN_SECRET, (err, user) => {
                if(err){
                    if(err.message === "invalid signature"){
                        res.status(401).json({error:err,action:"removeJwt"});
                        return;
                    }
                    console.log(err);
                    res.status(401).json({error:err});
                }else{
                    res.json({index:"user", droits:"W", jwt:req.body.jwt});
                }
            })
        }else{
            //Check si user exist et a le bon mot de passe, sinon on renvoie un 201
            if(req.body.nickname){
                let userData = await user.getUser(dbManager.getDBname(),dbManager.getClient(), req.body.nickname);
                console.log(userData);
                if(userData.length > 0) {
                    const isPasswordValid = await user.checkPasswordValidity(req.body.password,userData[0].password);
                    if(!isPasswordValid){
                        res.status(401).json({error:"badPassword",action:"badPassword"});
                        return;
                    }
                }else{
                    res.status(401).json({error:"badPassword",action:"badPassword"});
                    return;
                }
                const jwtSign = user.generateAccessToken({ username: 'test' })
                res.json({index:"user", droits:"W", jwt:jwtSign});
                return;
            }
            res.status(401).json({error:"badPassword",action:"badPassword"});
        }
});

module.exports = router;