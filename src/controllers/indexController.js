const express = require('express');
const router  = express.Router();
const randomSearchController = require('./randomSearch_controller.js');

router.use('/api/random_search', randomSearchController);

module.exports = router;
