const express = require('express')
const { register } = require('../controllers/auth')
const router = express.Router()

const {
	createProduct,
	deleteProduct,
	getAllProducts,
	updateProduct,
	getProduct,
	getProductsBySearch,
	getProductsByFilter,
} = require('../controllers/products')

router.route('/').post(createProduct).get(getAllProducts)

router.route('/:id').get(getProduct).delete(deleteProduct).patch(updateProduct)

router.route('/search').get(getProductsBySearch)

router.route('/filter').get(getProductsByFilter)

module.exports = router