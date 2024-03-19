const dbManager = require('../MongoDB/dbManager')
const express = require('express');
const event = require('../model/event')
const {memoryStorage} = require("multer");
const multer = require("multer");
const router = express.Router();

// Set up multer storage configuration
const storage = memoryStorage();
const upload = multer({storage: storage});

/**
 * Récupère tous les events
 */
router.get('/', async (req, res) => {
    let eventData = await event.getAllEvents(dbManager.getDBname(), dbManager.getClient());
    res.json({eventData: eventData})
})

/**
 * Récupère les events selon le filtre passé en paramètre de l'URL
 */
router.get('/filtre', async (req, res) => {
    let eventData = await event.getEventsFiltered(dbManager.getDBname(), dbManager.getClient(), req.query)
    console.log(eventData);
    res.json({eventData: eventData});
});

/**
 * Ajoute un évènement dans la collection `events` de MongoDB
 */
router.post('/', upload.single('image'), async (req, res) => {
    try {
        let image;
        if (req.file) {
            image = {
                filename: req.file.originalname,
                contentType:
                req.file.mimetype,
                data:
                    req.file.buffer.toString('base64')
            }
        } else {
            image = req.body.imageURL
        }
        event.insertEvent(dbManager.getDBname(), dbManager.getClient(), {
            name: req.body.name,
            price: req.body.price,
            date: req.body.date,
            theme: req.body.theme,
            owner: req.body.userId,
            image: image
        })
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

router.get('/favorites/:id', async (req, res) => {
    let eventData = await event.getAllFavoritesFromUsersOfEvent(dbManager.getDBname(), dbManager.getClient(), req.params.id)
    res.json({eventData: eventData});
})

/**
 * Récupère tous les events d'un utilisateur
 */
router.get('/byUser/:id', async (req, res) => {
    let eventData = await event.getAllEventsFromUser(dbManager.getDBname(), dbManager.getClient(), req.params.id)
    res.json({eventData: eventData});
});

/**
 * Récupère un event selon son id
 */
router.get('/:id', async (req, res) => {
    let eventData = await event.getEvent(dbManager.getDBname(), dbManager.getClient(), req.params.id)
    res.json({eventData: eventData});
});

/**
 * Vérifie si un event est possédé par un certain utilisateur
 */
router.get('/ownership', async (req, res) => {
    let eventData = await event.isUserOwner(dbManager.getDBname(), dbManager.getClient(), req.query.eventId, req.query.userId)
    res.json({eventData: eventData});
});

module.exports = router;