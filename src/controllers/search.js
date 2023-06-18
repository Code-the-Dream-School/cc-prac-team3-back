const Product = require('../../models/Product')
//const mongosh = require('mongosh')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const { query } = require('express')

const getProductsBySearch = async (req, res) => {
	try {
		const req = req.params.text

		console.log(req)
		
		const query = { $text: { $search: req } }

		const projection = {
			_id: 0,
			productName: 1,
			category: 1,
			description: 1,
		}

		const findProducts = Product.find(query).project(projection)
		
		if (!findProducts){
			throw new NotFoundError('No products match your search')
		}

		res.status(StatusCodes.OK).json({ findProducts })
	} catch {
	    throw new BadRequestError('bad request')
	}
	
}

const getProductsByCategory = async (req, res) => {
	try{
		const {params:{category:category}}=req
		const productByType= await Product.find({category:category}).sort('createdAt');
		res.status(StatusCodes.OK).json({productByType, count:productByType.length})
	} catch{
		if (!productByType){
			throw new NotFoundError('There are no products that match this category')
		}
	}
}

module.exports = {
	getProductsBySearch,
	getProductsByCategory,
}