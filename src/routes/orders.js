const express = require('express')
const { register } = require('../controllers/auth')
const router = express.Router()

const {
	getOrder
} = require('../controllers/orders')

router.route('/').get(getOrder)


module.exports = router
