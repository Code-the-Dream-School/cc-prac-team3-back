const User = require('../../models/User') //required to authenticate user
const jwt = require('jsonwebtoken') ///required to authenticate user with JWT
const { UnauthenticatedError } = require('../errors')

const authMiddleware = async (req, res, next) => {
	//check header
	const authHeader = req.headers.authorization
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		return new UnauthenticatedError('Authentication invalid')
	}
	const token = authHeader.split(' ')[1]

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET)
		req.user = { userId: payload.userId, name: payload.name }
		next()
	} catch (error) {
		return new UnauthenticatedError('authentication invalid')
	}
}

module.exports = authMiddleware
