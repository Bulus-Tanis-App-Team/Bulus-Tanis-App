const express = require('express');
const friendsController = require('../controllers/friendsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.route('/get').post(authMiddleware,friendsController.getFriends);
router.route('/create').post(authMiddleware,friendsController.createFriends);

module.exports = router;