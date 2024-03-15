const express = require('express');
const router = express.Router();
const session = require('express-session');
const jwt = require('jsonwebtoken');
const dbManager = require('../MongoDB/dbManager')
const utilisateur = require('../model/Utilisateur')

//TODO : Logique
// /user : Lire les données en BDD et les afficher
// Si clic bouton favoris, rediriger vers /user/favorites
// /user/favorites : récupérer la liste des favoris en BDD

router.get('/', (req, res) => {
    res.json({index:"user"});
});

/**
 * Renvois les droits de l'utilisateurs
 */
//TODO: ajout du check des droits avec Mongo et si la session n'existe pas
router.post('/',
    async (req, res) => {
    console.log(req.body);
    console.log(await utilisateur.getUtilisateur(dbManager.getDBname(),dbManager.getClient()));
    if(req.body.jwt){
        jwt.verify(req.body.jwt, process.env.TOKEN_SECRET, (err, user) => {
            if(err){
                console.log(err);
            }else{
                res.json({index:"user", droits:"W", jwt:req.body.jwt});
            }
        })
    }else{;
        const jwtSign = generateAccessToken({ username: 'test' })
        res.json({index:"user", droits:"W", jwt:jwtSign});
    }
});

function generateAccessToken(username) {
    process.env.TOKEN_SECRET = require('crypto').randomBytes(64).toString('hex');
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}


module.exports = router;