const express = require('express');
const router = express.Router();
const eventControllers = require('../controllers/eventsControllers');


router.get('/weekly-leaderboard',eventControllers.weeklyLeaderBoard); // returns weekly leaderboard

module.exports = router;

