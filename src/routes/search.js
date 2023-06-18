const express = require('express')
const router = express.Router()

const {
	getProductsBySearch,
	getProductsByCategory,
} = require('../controllers/search')

router.route('/:text').get(getProductsBySearch)

router.route('/:category').get(getProductsByCategory)

module.exports = router