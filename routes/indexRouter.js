const express = require('express');
const router = express.Router();
const dbManager = require('../MongoDB/dbManager')
const event = require("../model/event");

router.get('/accueil', async (req, res) => {
    let eventData = await event.getAllEvents(dbManager.getDBname(), dbManager.getClient());
    res.json({eventsData: eventData})
})

module.exports = router;