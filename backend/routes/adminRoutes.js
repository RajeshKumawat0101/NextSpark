const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminControllers');
const { restrictToLoggedInOnly } = require('../middleware/auth');

router.post("/sign-up",adminControllers.signUp);
router.post("/login",adminControllers.logIn);
router.use(['/review-list', '/to-review/:workId'], restrictToLoggedInOnly);
router.get('/review-list',adminControllers.reviewList); // returns list of works
router.post('/to-review/:workId',adminControllers.toReview); // accepts work from allWorks and then push it into works

module.exports = router;

