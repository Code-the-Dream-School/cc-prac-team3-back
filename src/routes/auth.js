const express = require('express')
const router = express.Router()

const { login, register } = require('../controllers/auth') // <-- Add reset controller

router.post('/register', register)
router.post('/login', login)
// router.post('/reset', reset)


module.exports = router