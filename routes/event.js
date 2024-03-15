const express = require('express');
const router = express.Router();

const { MongoClient, ObjectId} = require('mongodb');
require('dotenv').config()
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

//TODO : Logique
// Si demande de visionnage d'un event, rediriger vers /events/XXXXX (pas de back)
// Si demande de création d'un event, rediriger vers /event/create et afficher le formulaire
// Si demande de modification d'un event, rediriger vers /events/XXXXX/update et réutiliser le formulaire
// /events/create : formulaire de création (pas de back)
// /events/XXXXX : visionnage des détails d'un event (récupération des infos en BDD)
// /events/XXXXX/update : formulaire de création pré-rempli des infos existantes

router.get('/', async (req, res) => {
    const db = client.db(process.env.DATABASE_NAME)
    let collection = await db.collection("events");
    let results = await collection.find({})
        .limit(50)
        .toArray();
    res.send(results).status(200);
});

// Get event information for display
router.get('/:id', async (req, res) => {
    const db = client.db(process.env.DATABASE_NAME)
    let collection = await db.collection("events");
    let results = await collection.find({"_id" : new ObjectId(req.params.id)})
        .limit(50)
        .toArray();
    res.send(results).status(200);
});

// Get event information for display in form
router.get('/:id/update', async (req, res) => {
    const db = client.db(process.env.DATABASE_NAME)
    let collection = await db.collection("events");
    let results = await collection.find({"_id" : new ObjectId(req.params.id)})
        .limit(50)
        .toArray();
    res.send(results).status(200);
});

module.exports = router;