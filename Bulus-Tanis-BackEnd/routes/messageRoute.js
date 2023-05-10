const express = require('express');
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.route('/send').post(authMiddleware,messageController.createMessage);
router.route('/get').post(authMiddleware,messageController.getMessages);
//router.route('/send').post(authMiddleware,authController.test);

module.exports = router;