const express = require('express');
const router = express.Router();

//TODO : Logique
// /chat : Récupérer la liste des conversations et les afficher
// si clic sur la conversation XXXXXXXX, rediriger vers /chat/XXXXXXXX ?
// /chat/XXXXXXXX : récupérer tous les messages de la conversation et les afficher

router.get('/', (req, res) => {
    res.render('listChats', {title: "Discussions"});
});

router.get('/:id', (req, res) => {
    res.render('chat', {title: req.params.id});
});

module.exports = router;