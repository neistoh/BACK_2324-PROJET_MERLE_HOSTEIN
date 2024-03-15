const express = require('express');
const router = express.Router();
const session = require('express-session');
const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId} = require('mongodb');
require('dotenv').config()
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);


//TODO : Logique
// /user : Lire les données en BDD et les afficher
// Si clic bouton favoris, rediriger vers /user/favorites
// /user/favorites : récupérer la liste des favoris en BDD

router.get('/', async (req, res) => {
    const db = client.db(process.env.DATABASE_NAME)
    let collection = await db.collection("users");
    let results = await collection.findOne({"_id" : new ObjectId(req.params.id)})
        .limit(50)
        .toArray();
    res.send(results).status(200);
});

router.get('/favorites', async (req, res) => {
    const db = client.db(process.env.DATABASE_NAME)
    let collection = await db.collection("favorites");
    let results = await collection.find({"_id" : new ObjectId(req.params.id)})
        .limit(50)
        .toArray();
    res.send(results).status(200);
});

/**
 * Renvois les droits de l'utilisateurs
 */
//TODO: ajout du check des droits avec Mongo et si la session n'existe pas
router.post('/', (req, res) => {
    console.log(req.body);
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