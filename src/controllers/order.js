const Order = require('../../models/Order')

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

//const createOrder = async (req, res) => {
//	req.body.createdBy = req.user.userId
//	const order = await Order.create(req.body)
//	res.status(StatusCodes.CREATED).json({ order })

const User = require('../../models/User')
const Product = require('../../models/Product')


require('dotenv').config() //needed to read values for email config 
const transporter = require('../middleware/email')


const createOrder = async (req, res) => {

	req.body.createdBy = req.user.userId

	const buyer  = await User.findById(req.body.createdBy)//define user that created order as the buyer 
	const product = await Product.findById(req.body.products) //product ID taken from request body and finds corresponding product document
	const seller = await User.findById(product.createdBy) //define user that created the product as the seller

	const order = await Order.create(req.body) // create Order using request body 

	res.status(StatusCodes.CREATED).json({ order }) //return successful status code and order 

	//confirmation email config
	let mailOptions = {
		from: `<Nursery Finds>${process.env.MAIL_USERNAME}`, // sender address
		to: `${buyer.email}`, // list of receivers
		subject: 'Order Confirmation', // Subject line
		text: `Confirmation Email`, // plain text body
		html: `<p>Thank you for shopping with us. Please contact the seller to coordinate pickup.</p>
		<ul>
		<li>Name: ${seller.name} </li>
		<li>Email: ${seller.email}</li>
		<li>Number:${seller.number}</li>
		</ul> 
		<p>If you have any trouble organizing pick up, please contact us at nurseryfinds.help@gmail.com</p>` // html body
	}

	transporter.sendMail(mailOptions, function (err, data) {
		if (err) {
			console.log('Error' + err)
		} else {
			console.log('Email sent successfully')
		}
	})



}

const getOrder = async (req, res) => {
	const {
		user: { userId },
		params: { id: orderId },
	} = req
	const order = await Order.findOne({
		_id: orderId,
		createdBy: userId,
	})
	if (!order) {


		return res
			.status(StatusCodes.BAD_REQUEST)
			.json(new NotFoundError(`No product with id ${orderId}`))


	}
	res.status(StatusCodes.OK).json({ order })
}

const getAllOrders = async (req, res) => {
	const orders = await Order.find({ createdBy: req.user.userId }).sort(
		'createdAt'
	)
	res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

const updateOrder = async (req, res) => {
	const {
		body: { status, products, date_ordered, Buyer, Seller },
		user: { userId },
		params: { id: orderId },
	} = req
	if (
		status === '' ||
		products === '' ||
		date_ordered === '' ||
		Buyer === '' ||
		Seller === ''
	) {


		return res.status(StatusCodes.BAD_REQUEST).json(new NotFoundError('Please fill in all fields.'))


	}
	const order = await Order.findByIdAndUpdate(
		{ _id: orderId, createdBy: userId },
		req.body,
		{ new: true, runValidators: true }
	)
	if (!order) {


		return res.status(StatusCodes.BAD_REQUEST).json(new NotFoundError(`No item with id ${orderId}`))


	}
	res.status(StatusCodes.OK).json({ order })
}

module.exports = {
	updateOrder,
	createOrder,
	getOrder,
	getAllOrders,
}