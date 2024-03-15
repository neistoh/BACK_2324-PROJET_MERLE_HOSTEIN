const express = require('express');
const router = express.Router();
const dbManager = require('../MongoDB/dbManager')
const event = require('../model/event')

/**
 * Récupère les messages d'une conversation d'un utilisateur
 */
router.get('/:eventId', async (req, res) => {
    let eventData = await event.getEvent(dbManager.getDBname(), dbManager.getClient(), req.params.eventId)
    res.json({evtData: eventData});
});

module.exports = router;