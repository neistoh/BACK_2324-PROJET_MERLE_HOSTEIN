const express = require('express');
const router = express.Router();
const dbManager = require('../MongoDB/dbManager')

//TODO : Logique
// Si demande de visionnage d'un event, rediriger vers /events/XXXXX
// Si demande de création d'un event, rediriger vers /event/create et afficher le formulaire
// Si demande de modification d'un event, rediriger vers /events/XXXXX/update et réutiliser le formulaire
// /events/create : formulaire de création
// /events/XXXXX : visionnage des détails d'un event (récupération des infos en BDD)
// /events/XXXXX/update : formulaire de création pré-rempli des infos existantes

router.get('/', (req, res) => {
    res.json({index:"event"});
});

module.exports = router;