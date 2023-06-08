const express = require('express')
const router = express.Router()

const {
	login,
	register,
	forgotPassword,
	resetPassword,
} = require('../controllers/auth')
router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.get('/reset-password/:id/:token', resetPassword) //delete this in next push
router.post('/reset-password/:id/:token', resetPassword)

module.exports = router
