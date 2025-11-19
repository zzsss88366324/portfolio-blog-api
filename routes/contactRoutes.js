const express = require('express');
const router = express.Router();
const { createMessage, getMessages } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createMessage).get(protect, getMessages);

module.exports = router;
