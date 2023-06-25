const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
	{
		productName: {
			type: String,
			required: [true, 'Please provide product name'],
		},
		productImage : {
			type: String, 
			required: true,
			}, 
		category: {
			type: String,
			enum: [
				'Furniture',
				'Car Seats & Boosters',
				'Cribs',
				'Strollers',
				'Baby Monitors',
				'Highchairs',
				'Toys & Books',
				'Clothing',
			],
			required: [true, 'Please provide product category'],
		},
		description: {
			type: String,
			required: [true, 'Please provide product description'],
		},
		condition: {
			type: String,
			enum: ['New', 'Like New', 'Good', 'Fair'],
			required: [true, 'Please provide product condition'],
		},
		price: {
			type: Number,
			required: [true, 'Please provide price'],
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
		},
		date_added: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)
