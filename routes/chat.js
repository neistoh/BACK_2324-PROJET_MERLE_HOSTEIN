const express = require('express');
const router = express.Router();

const { MongoClient, ObjectId} = require('mongodb');
require('dotenv').config()
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

//TODO : Logique
// /chat : Récupérer la liste des conversations et les afficher
// si clic sur la conversation XXXXXXXX, rediriger vers /chat/XXXXXXXX ?
// /chat/XXXXXXXX : récupérer tous les messages de la conversation et les afficher

router.get('/', async (req, res) => {
    const db = client.db("isenconnect")
    let collection = await db.collection("chats");
    let results = await collection.find({})
        .limit(50)
        .toArray();
    res.send(results).status(200);
});

router.get('/:id', async (req, res) => {
    const db = client.db("isenconnect")
    let collection = await db.collection("chats");
    let results = await collection.find({"_id" : new ObjectId(req.params.id)})
        .limit(50)
        .toArray();
    res.send(results).status(200);
});

module.exports = router;