const express = require('express');
const searchController = require('../controllers/searchController');
//const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.route('/get').post(searchController.searchUser);
//router.route('/get').post(authMiddleware,authController.test);

module.exports = router;