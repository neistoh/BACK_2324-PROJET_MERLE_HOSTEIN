const express = require('express');
const router = express.Router();
const session = require('express-session');
const dbManager = require('../MongoDB/dbManager')
const user = require('../model/user')

/**
 * Récupère les infos d'un user
 */
router.get('/', async (req, res) => {
    let userData = await user.getUser(dbManager.getDBname(), dbManager.getClient(), req.params.nickname)
    res.json({usr: userData});
});

/**
 * Récupère les évènements favoris d'un user
 */
router.get('/', async (req, res) => {
    let userData = await user.getFavorites(dbManager.getDBname(), dbManager.getClient(), req.params.nickname)
    res.json({usr: userData});
});

module.exports = router;