const router = require('express').Router();
const db = require('../models');
const apiRoutes = require('./api/bookApi');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;