const express = require('express');
const router = express.Router();

//TODO : Logique
// / : vérif de token JWT
// Si pas de token JWT, redirection vers /login
// Si token, redirection vers /accueil

router.get('/', (req, res) => {
    res.render('index', {title: "Bienvenue sur LinkedISEN !"});
});

module.exports = router;