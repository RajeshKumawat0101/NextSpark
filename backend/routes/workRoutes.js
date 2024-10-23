// routes/jobRoutes.js
const express = require('express');
const workController = require('../controllers/workController'); 

const router = express.Router();

router.post('/post-to-review', workController.postWorkForReview); // fine
router.get('/all-works', workController.getAllWorks);  //fine
router.get('/my-works/:useremail', workController.getMyWorks); //by user
router.get('/my-works-by-id/:id',workController.getWork); //by id
router.put('/my-works/update-work/:id',workController.updateWork);
router.delete('/delete-work/:id',workController.deleteByID); 
 
module.exports = router;
  