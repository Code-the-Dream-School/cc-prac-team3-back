const Product = require('../../models/Product')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
//const { query } = require('express')
//const { search } = require('../routes/search')

const getProductsBySearch = async (req, res) => {
		const search = req.params.text
		
		const query =  {productName:{$regex: search, $options:'i'}}

		const findProducts =  await Product.find(query)

		if(findProducts.length > 0){
			res.status(StatusCodes.OK).json({findProducts})
		}

		else if (findProducts.length === 0){
			res.status(StatusCodes.NOT_FOUND).json(new Error(`No products match your search: ${search}`))
		}

}

const getProductsByCategory = async (req, res) => {
	try{
		const {params:{category:category}}=req
		const productByType= await Product.find({category:category}).sort('createdAt');
		res.status(StatusCodes.OK).json({productByType, count:productByType.length})
	} catch{
		if (!productByType){
			//throw new NotFoundError('There are no products that match this category')
			res.status(StatusCodes.NOT_FOUND).json(new Error('There are no products that match this category'))
		}
	}
}

module.exports = {
	getProductsBySearch,
	getProductsByCategory,
}