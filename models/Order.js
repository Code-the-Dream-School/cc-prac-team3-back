const User = require('./User')
const Product = require('./Product')
const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
	{
		status: {
			type: String,
			enum: ['Pending', 'Complete'],
			required: [true, 'Please provide the status'],
		},
		date_ordered: {
			type: Date,
			default: Date.now,
		},
		products: {
			type: mongoose.Types.ObjectId,
			ref: Product,
			required: [true, 'Please provide product'],
		},


		buyer: {

			type: mongoose.Types.ObjectId,
            ref: User,
            
		},


		seller: {

			type: mongoose.Types.ObjectId,
			ref: User,
        },
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
		}
        // Do we need this?
		// totalPrice: {
		// 	type: Number,
		// 	required: [true, 'Please provide price'],
		// },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema)
