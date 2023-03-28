const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();


router.put('/regiser', authController.signUp);

router.post('/login', authController.signIn)


module.exports = router
