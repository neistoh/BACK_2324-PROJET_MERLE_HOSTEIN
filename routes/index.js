const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: "Bienvenue sur LinkedISEN !"});
});

module.exports = router;