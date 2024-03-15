const express = require('express');
const router = express.Router();

const { MongoClient } = require('mongodb');
require('dotenv').config()
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

//TODO : Logique
// / : vérif de token JWT
// Si pas de token JWT, redirection vers /login
// Si token, redirection vers /accueil
// /login : connexion ou création d'un compte
// /accueil : page principale, liste les évents récupérés en base

router.get('/', (req, res) => {
    res.json({index:"Index"});
});

module.exports = router;