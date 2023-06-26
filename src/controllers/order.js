const Order = require('../../models/Order')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const createOrder = async (req, res) => {
	req.body.createdBy = req.user.userId
	const order = await Order.create(req.body)
	res.status(StatusCodes.CREATED).json({ order })
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
		throw new NotFoundError(`No product with id ${orderId}`)
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
		throw new BadRequestError('Please fill in all fields.')
	}
	const order = await Order.findByIdAndUpdate(
		{ _id: orderId, createdBy: userId },
		req.body,
		{ new: true, runValidators: true }
	)
	if (!order) {
		throw new NotFoundError(`No item with id ${orderId}`)
	}
	res.status(StatusCodes.OK).json({ order })
}

module.exports = {
	updateOrder,
	createOrder,
	getOrder,
	getAllOrders,
}
