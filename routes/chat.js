const express = require('express');
const router = express.Router();

//TODO : Logique
// /chat : Récupérer la liste des conversations et les afficher
// si clic sur la conversation XXXXXXXX, rediriger vers /chat/XXXXXXXX ?

router.get('/', (req, res) => {
    res.render('index', {title: "Discussions"});
});

module.exports = router;