const express = require('express');

const router = express.Router();

const { signin, signup, requestPasswordReset, newPassword } = require('../../controllers/Auth/authController');

router.post('/signin', signin);
router.post('/signup', signup);

router.post('/reqpassreset', requestPasswordReset);
router.post('/newpass', newPassword);

module.exports = router;
