const express = require('express');
const friendsController = require('../controllers/friendsController');
//const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.route('/get').post(friendsController.getFriends);
router.route('/create').post(friendsController.createFriends);
//router.route('/get').post(authMiddleware,authController.test);

module.exports = router;