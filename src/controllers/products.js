const Product = require('../models/Product');
const {statusCodes}= require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');
const { query } = require('express');

const createProduct = async (req, res)=>{
    console.log ("create product")
}

//my goal is that this shows all products so that shoppers can view what others have posted. Should we filter this by location?
const getAllProducts = async (req, res)=>{
    const products = await Product.find({}).sort('createdAt')
    res.status(StatusCodes.OK).json({products, count:products.length})
}

const 	getProductsBySearch = async (req, res) =>{
    const req = req.body
    const search = {$text:{$search:req}}

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

    const findProducts = Product.find(search).project(projection); 

    if (!findProducts){
        throw new NotFoundError ('No products match your search')
    }
    res.status(StatusCodes.OK).json({findProducts})
}


const getProductsByFilter = async (req, res) =>{
    //going to use query params here I think. 
}

const getProduct = async (req, res)=>{
    console.log ("get product")
}

const updateProduct = async (req, res)=>{
    console.log ("update product")
}

const deleteProduct = async (req, res)=>{
    console.log ("create product")
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