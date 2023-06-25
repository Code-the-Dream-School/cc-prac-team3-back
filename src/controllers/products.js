const Product = require('../../models/Product')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const { query } = require('express')


//my goal is that this shows all products so that shoppers can view what others have posted. Should we filter this by location?

const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}).sort('createdAt')
		res.status(StatusCodes.OK).json({ products, count: products.length })

		if (!products) {
			throw new NotFoundError('No products found')
		}
	} catch (error) {
		console.log(error)
	}
} 

const getProductsBySearch = async (req, res) => {
	try {
		const req = req.body
		const search = { $text: { $search: req } }

		const projection = {
			_id: 1,
			productName: 1,
			category: 1,
			description: 1,
			condition: 1,
			price: 1,
			createdBy: 1,
			date_added: 1,
		}

		const findProducts = Product.find(search).project(projection)
		res.status(StatusCodes.OK).json({ findProducts })
	} catch {
		if (!findProducts) {
			throw new NotFoundError('No products match your search')
		}
	}
}

const getProductsByFilter = async (req, res) =>{
    //going to use query params here I think. 
}

const getProduct = async (req, res) => {
	try {
		const {
			user: { userId },
			params: { id: productId },
		} = req

		const product = await Product.findOne({
			_id: productId,
			createdBy: userId,
		})

		res.status(StatusCodes.OK).json({ product })
		if (!product) {
			throw new NotFoundError(`No product with id ${productId}`)
		}
	} catch (error) {
		console.log(error)
	}
} 
   
const createProduct = async (req, res) => {
	
	req.body.createdBy = req.user.userId
	req.body.productImage = req.file.path

	const product = await Product.create(req.body)
	res.status(StatusCodes.CREATED).json({product})
}



const updateProduct = async (req, res) => {
	try {
		const {
			body: { productName, category, description, condition, price },
			user: { userId },
			params: { id: productId },
		} = req

		if (
			productName === '' ||
			category === '' ||
			description === '' ||
			condition === '' ||
			price === ''
		) {
			throw new BadRequestError('Please fill in all fields.')
		}
		const products = await Product.findByIdAndUpdate(
			{ _id: productId, createdBy: userId },
			req.body,
			{ new: true, runValidators: true }
		)
		if (!products) {
			throw new NotFoundError(`No product with id ${productId}`)
		}
		res.status(StatusCodes.OK).json({ products })
	} catch (error) {
		console.log(error)
	}
}

const deleteProduct = async (req, res) => {
	try {
		const {
			user: { userId },
			params: { id: productId },
		} = req

		const product = await Product.findByIdAndDelete({
			_id: productId,
			createdBy: userId,
		})
		if (!product) {
			throw new NotFoundError(`No Product with id ${productId}`)
		}
		res.status(StatusCodes.OK).json({ msg: 'The Product was deleted.' })
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	createProduct,
	deleteProduct,
	getAllProducts,
	updateProduct,
	getProduct,
	getProductsBySearch,
	getProductsByFilter,
	
}
