const express = require('express');
const router = express.Router();
const dbManager = require('../MongoDB/dbManager')
const event = require('../model/event')

/**
 * Récupère les messages d'une conversation d'un utilisateur
 */
router.get('/:id', async (req, res) => {
    let eventData = await event.getEvent(dbManager.getDBname(), dbManager.getClient(), req.params.id)
    res.json({evtData: eventData});
});

/**
 * Ajoute un évènement dans la collection `events` de MongoDB
 */
router.post('/', async (req, res) => {
    const event = req.body;
    try {
        event.insertEvent(dbManager.getDBname(), dbManager.getClient(), event)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

/**
 * Modifie un message dans la collection `messages` de MongoDB
 */
router.put('/:id', async (req, res) => {
    const event = req.body;
    try {
        event.updateEvent(dbManager.getDBname(), dbManager.getClient(), req.params.id, event)
    } catch (err) {
        res.status(400).send({error: err.message})
    }
})

module.exports = router;