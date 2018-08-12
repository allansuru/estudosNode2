const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('index', { title: 'Pug View Engine', message: 'Hello'})
});

module.exports = router;