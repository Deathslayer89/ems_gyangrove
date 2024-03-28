const express = require('express');
const eventController = require('../controller/eventController');
const router = express.Router();

router.post('/', eventController.createEvents);
router.get('/find', eventController.findEvents);

module.exports = router;