const express = require('express');
const router = express.Router();

//TODO : Logique
// /event : récupérer tous les events et les afficher
// Si demande de visionnage d'un event, rediriger vers /events/XXXXX
// Si demande de création d'un event, rediriger vers /event/create et afficher le formulaire
// Si demande de modification d'un event, rediriger vers /event/update et réutiliser le formulaire

router.get('/', (req, res) => {
    res.render('index', {title: "Évènements"});
});

module.exports = router;