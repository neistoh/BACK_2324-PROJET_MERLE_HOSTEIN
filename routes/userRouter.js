const express = require('express');
const router = express.Router();
const dbManager = require('../MongoDB/dbManager')
const user = require('../model/user')

/**
 * Récupère les infos d'un utilisateur
 */
router.get('/', async (req, res) => {
    let userData = await user.getUser(dbManager.getDBname(), dbManager.getClient(), req.params.nickname)
    res.json({usr: userData});
});

/**
 * Récupère les évènements favoris d'un utilisateur
 */
router.get('/', async (req, res) => {
    let userData = await user.getFavorites(dbManager.getDBname(), dbManager.getClient(), req.params.nickname)
    res.json({usr: userData});
});

/**
 * Ajoute un utilisateur dans la collection `users` de MongoDB
 */
router.post('/', async (req, res) => {
    const user = req.body;
    try {
        user.insertUser(dbManager.getDBname(), dbManager.getClient(), user)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router;