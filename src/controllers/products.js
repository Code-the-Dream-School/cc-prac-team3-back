const Product = require('../../models/Product')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const { query } = require('express')


//my goal is that this shows all products so that shoppers can view what others have posted. Should we filter this by location?

//gets all products from all users 
const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}).sort('createdAt')
		res.status(StatusCodes.OK).json({ products, count: products.length })

		if (!products) {


			res.status(StatusCodes.NOT_FOUND).json(new Error('No products found'))


		}
	} catch (error) {
		console.log(error)
	}
} 

//gets all products from particular
const getProducts = async (req, res) => {
	const {user} = req.body
	
	try {
		
		const products = await Product.find({createdBy: user}).sort('createdAt')
		res.status(StatusCodes.OK).json({ products, count: products.length })

		if (!products) {
			return new NotFoundError('No products found')
		}
	} catch (error) {
		console.log(error)
	}
} 



const getProduct = async (req, res) => {
	try {
		const {
			params: { id: productId },
		} = req

		const product = await Product.findOne({
			_id: productId,
		})

		res.status(StatusCodes.OK).json({ product })
		if (!product) {
			res.status(StatusCodes.NOT_FOUND).json(new Error(`No product with id ${productId}`))
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
			res.status(StatusCodes.BAD_REQUEST).json(new Error('Please fill in all fields.'))
		}
		const products = await Product.findByIdAndUpdate(
			{ _id: productId, createdBy: userId },
			req.body,
			{ new: true, runValidators: true }
		)
		if (products){
			res.status(StatusCodes.OK).json({ products })
		}
		if (!products) {
			res.status(StatusCodes.NOT_FOUND).json(new Error(`No product with id ${productId}`))
		}
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
		if (product){
			res.status(StatusCodes.OK).json({ msg: 'The Product was deleted.' })
		}
		if (!product) {
			res.status(StatusCodes.NOT_FOUND).json(new Error(`No product with id ${productId}`))
		}
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProducts, 
	updateProduct,
	getProduct,
	

}
