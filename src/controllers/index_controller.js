const express = require('express');
const router = express.Router();

router.use('/api/random_search', require('./randomSearch_controller.js'));

module.exports = router;
