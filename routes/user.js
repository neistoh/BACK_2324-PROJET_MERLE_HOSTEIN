const express = require('express');
const router = express.Router();


//TODO : Logique
// /user : Lire les données en BDD et les afficher
// Si clic bouton favoris, rediriger vers /user/favorites

router.get('/', (req, res) => {
    res.render('index', {title: "Profil"});
});

module.exports = router;