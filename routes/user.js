const express = require('express');
const router = express.Router();

const { MongoClient } = require('mongodb');
require('dotenv').config()
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);


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
router.post('/', (req, res) => {
    console.log(req.body);
    res.json({index:"user", droits:"W"});
});

module.exports = router;