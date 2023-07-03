const express = require('express')
const { register } = require('../controllers/auth')
const authenticateUser = require('../middleware/authentication')
const router = express.Router()

const {
	createProduct,
	deleteProduct,
	getAllProducts,
	updateProduct,
	getProduct,
} = require('../controllers/products')

router.route('/').post(authenticateUser, createProduct).get(getAllProducts)

router.route('/:id').get(getProduct).delete(authenticateUser,deleteProduct).patch(authenticateUser, updateProduct)

module.exports = router
