const express = require('express');
const router = express.Router();
const session = require('express-session');
const dbManager = require('../MongoDB/dbManager')
const utilisateur = require('../model/user')

//TODO : Logique
// /user : Lire les données en BDD et les afficher
// Si clic bouton favoris, rediriger vers /user/favorites
// /user/favorites : récupérer la liste des favoris en BDD


/**
 * Récupère les infos d'un user
 */
router.get('/', async (req, res) => {
    let userData = await utilisateur.getUser(dbManager.getDBname(), dbManager.getClient(), req.params.nickname)
    res.json(userData);
});

router.get('/:nickname', async (req, res) => {
    let userData = await utilisateur.getUser(dbManager.getDBname(), dbManager.getClient(), req.params.nickname)
    res.json(userData);
});

module.exports = router;