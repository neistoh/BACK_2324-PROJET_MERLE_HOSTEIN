const express = require('express');
const router = express.Router();
const dbManager = require('../MongoDB/dbManager')
const event = require('../model/event')

//TODO : Logique
// Si demande de visionnage d'un event, rediriger vers /events/XXXXX
// Si demande de création d'un event, rediriger vers /event/create et afficher le formulaire
// Si demande de modification d'un event, rediriger vers /events/XXXXX/update et réutiliser le formulaire
// /events/create : formulaire de création
// /events/XXXXX : visionnage des détails d'un event (récupération des infos en BDD)
// /events/XXXXX/update : formulaire de création pré-rempli des infos existantes

/**
 * Récupère les conversations d'un utilisateur
 */
// TODO : À garder ? Pas sûr...
router.get('/', async (req, res) => {
    let eventData = await event.getAllEvents(dbManager.getDBname(), dbManager.getClient())
    res.json({eventsData: eventData});
});

/**
 * Récupère les messages d'une conversation d'un utilisateur
 */
router.get('/:eventId', async (req, res) => {
    let eventData = await event.getEvent(dbManager.getDBname(), dbManager.getClient(), req.params.eventId)
    res.json({evtData: eventData});
});

module.exports = router;