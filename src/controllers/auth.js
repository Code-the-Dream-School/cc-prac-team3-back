//double check top stuff with team's sections
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const { StatusCodes} = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const transporter = require('../middleware/email')

const register = async (req, res) => {
	console.log('inside register route')//troublehsooting

	const { email } = req.body

	console.log(email) //troublehsooting
	
	let user = await User.findOne({ email })      
	
	console.log(user) //troublehsooting

	if(!user){
		user = await User.create({ ...req.body })
		const token = user.createJWT()                                               
		//change to status codes when adding err handler
		res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
		console.log("no user") //troublehsooting
	} else {
		console.log('send the error') //troublehsooting
		return new BadRequestError('User with that email already exists');
	}
	

	
}

const login = async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return new BadRequestError('Please provide email and password')
	}

	const user = await User.findOne({ email })

	if (!user) {
		return new UnauthenticatedError('Invalid Credentials')
	}

	const isPasswordCorrect = await user.comparePassword(password)

	if (!isPasswordCorrect) {
		return new UnauthenticatedError('Invalid Credentials')
	}

	const token = user.createJWT()
	res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

const resetPassword = async (req, res) => {
	const { id, token } = req.params
	const { password, password2 } = req.body

	const user = await User.findById(id)
	if (!user) {
		res.send('Invalid ID')
		return
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET)

		if (password !== password2) {
			res.send('Passwords do not match')
		}

		bcrypt
			.hash(password, 10)
			.then((hash) => {
				user.password = hash
			})
			.catch((err) => console.error(err.message))
		res.send(user)
	} catch (error) {
		res.send('password reset link expired')
	}
}

const forgotPassword = async (req, res) => {
	const { email } = req.body
	const user = await User.findOne({ email })
	//console.log(user)

	if (!user) {
		return new UnauthenticatedError('User with this email does not exist')
	}

	const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '20m',
	})
	const link = `http://localhost:8000/api/v1/auth/reset-password/${user.id}/${token}`
	//console.log(link)
	res.send('Password reset link has been sent to your email')

	

	let mailOptions = {
		from: `${process.env.MAIL_USERNAME}@gmail.com`, // sender address
		to: `${user.email}`, // list of receivers
		subject: 'Link to Reset Password', // Subject line
		text: `${link}`, // plain text body
		html: `<p>
    Dear ${user.name}, you can reset your password at ${link} which will expire in 20 minutes.
    </p>`, // html body
	}

	transporter.sendMail(mailOptions, function (err, data) {
		if (err) {
			console.log('Error' + err)
		} else {
			console.log('Email sent successfully')
		}
	})
}

module.exports = {
	register,
	login,
	forgotPassword,
	resetPassword,
}
