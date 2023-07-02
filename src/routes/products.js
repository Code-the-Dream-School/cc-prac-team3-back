const express = require('express')
const { register } = require('../controllers/auth')
const router = express.Router()

const {
	createProduct,
	deleteProduct,
	getAllProducts,
	updateProduct,
	getProduct,
} = require('../controllers/products')

router.route('/').post(createProduct).get(getAllProducts)

router.route('/:id').get(getProduct).delete(deleteProduct).patch(updateProduct)

module.exports = router
