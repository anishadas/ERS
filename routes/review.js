const express = require("express");
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/newReview/:id', reviewController.createRev)
router.get('/edit/:id', reviewController.edit)
router.post('/update', reviewController.update)
// router.post('/adminReview',reviewController.addAdminReview)
module.exports = router;