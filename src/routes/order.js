const express = require('express')
const { register } = require('../controllers/auth')
const router = express.Router()

const {
	createOrder,
	getOrder,
	getAllOrders,
	updateOrder,
} = require('../controllers/order')

router.route('/').post(createOrder).get(getAllOrders)
router.route('/:id').get(getOrder).patch(updateOrder)

module.exports = router
