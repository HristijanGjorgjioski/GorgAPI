const express = require('express')

const router = express.Router()

const { signin, signup } = require('../../controllers/Auth/authController')

router.post('/signin', signin)
router.post('/signup', signup)

export default router
